// ModalBonus.tsx
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";
import { BonusProps } from "..";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { ErrorResponse } from "../../../../../App";

interface ModalBonusProps {
    isOpen: boolean;
    onClose: () => void;
    bonus: BonusProps | null;
}

export function ModalBonus({ isOpen, onClose, bonus }: ModalBonusProps) {
    const { user } = useContext(AuthContext);

    const [idUsuario, setIdUsuario] = useState(0);
    const [idTrajeto, setIdTrajeto] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [valorBonus, setValorBonus] = useState(0);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [trajetos, setTrajetos] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            carregarUsuarios();
            carregarTrajetos();

            if (bonus) {
                setIdUsuario(bonus.id_usuario);
                setIdTrajeto(bonus.id_trajeto);
                setDescricao(bonus.descricao);
                setValorBonus(bonus.valor_bonus);
                setDataInicio(new Date(bonus.data_inicio).toISOString().slice(0, 16));
                setDataFim(new Date(bonus.data_fim).toISOString().slice(0, 16));
            } else {
                resetForm();
            }
        }
    }, [bonus, isOpen]);

    const resetForm = () => {
        setIdUsuario(0);
        setIdTrajeto(0);
        setDescricao("");
        setValorBonus(0);
        setDataInicio("");
        setDataFim("");
    };

    const carregarUsuarios = async () => {
        const res = await api.get("/usuarios");
        setUsuarios(res.data);
    };

    const carregarTrajetos = async () => {
        const res = await api.get("/trajetos");
        setTrajetos(res.data);
    };

    const handleSave = async () => {
        if (!user) {
            return;
        }

        if (!idUsuario || !idTrajeto || !valorBonus || !dataInicio || !dataFim) {
            toast.error("Preencha todos os campos.")
            return;
        }

        try {
            const payload = {
                id_usuario: idUsuario,
                criado_por: user.id_usuario,
                id_trajeto: idTrajeto,
                descricao,
                valor_bonus: valorBonus,
                data_inicio: new Date(dataInicio).toISOString(),
                data_fim: new Date(dataFim).toISOString(),
            };

            if (bonus) {
                await api.put(`/bonus/${bonus.id_bonus}`, payload);
                toast.success("Bônus atualizado com sucesso!");
            } else {
                console.log(payload)
                await api.post("/bonus", payload);
                toast.success("Bônus criado com sucesso!");
            }
            onClose();
        } catch (error) {
            const err = error as ErrorResponse;
            toast.error(err?.response?.data?.mensagem || "Falha na conexão de rede.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">{bonus ? "Editar Bônus" : "Novo Bônus"}</h2>

                <label className="block mb-2">Usuário</label>
                <select
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value={0}>Selecione um usuário</option>
                    {usuarios.map(user => (
                        <option key={user.id_usuario} value={user.id_usuario}>{user.nome}</option>
                    ))}
                </select>

                <label className="block mb-2">Trajeto</label>
                <select
                    value={idTrajeto}
                    onChange={(e) => setIdTrajeto(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value={0}>Selecione um trajeto</option>
                    {trajetos.map(t => (
                        <option key={t.id_trajeto} value={t.id_trajeto}>{`${t.partida} → ${t.destino}`}</option>
                    ))}
                </select>

                <label className="block mb-2">Valor Bônus</label>
                <input
                    type="number"
                    value={valorBonus}
                    onChange={(e) => setValorBonus(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                />

                <label className="block mb-2">Data de Início</label>
                <input
                    type="datetime-local"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                <label className="block mb-2">Data de Fim</label>
                <input
                    type="datetime-local"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                <label className="block mb-2">Descrição</label>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
                </div>
            </div>
        </div>

    );
}
