import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";

interface BonusProps {
    id_bonus?: number;
    id_usuario: number;
    id_trajeto: number;
    descricao: string;
    valor_bonus: number;
    data_inicio: string;
    data_fim: string;
}

interface ModalBonusProps {
    isOpen: boolean;
    onClose: () => void;
    bonus?: BonusProps | null;
}

export function ModalBonus({ isOpen, onClose, bonus }: ModalBonusProps) {
    const [idUsuario, setIdUsuario] = useState(0);
    const [idTrajeto, setIdTrajeto] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [valorBonus, setValorBonus] = useState(0);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    useEffect(() => {
        if (bonus) {
            setIdUsuario(bonus.id_usuario);
            setIdTrajeto(bonus.id_trajeto);
            setDescricao(bonus.descricao);
            setValorBonus(bonus.valor_bonus);
            setDataInicio(new Date(bonus.data_inicio).toISOString().slice(0, 16));
            setDataFim(new Date(bonus.data_fim).toISOString().slice(0, 16));
        } else {
            setIdUsuario(0);
            setIdTrajeto(0);
            setDescricao("");
            setValorBonus(0);
            setDataInicio("");
            setDataFim("");
        }
    }, [bonus]);

    const handleSave = async () => {
        try {
            if (bonus) {
                await api.put(`/bonus/${bonus.id_bonus}`, {
                    id_usuario: idUsuario,
                    id_trajeto: idTrajeto,
                    descricao,
                    valor_bonus: Number(valorBonus),
                    data_inicio: new Date(dataInicio).toISOString(),
                    data_fim: new Date(dataFim).toISOString(),
                });
                toast.success("Bônus atualizado com sucesso!");
            } else {
                await api.post("/bonus", {
                    id_usuario: idUsuario,
                    id_trajeto: idTrajeto,
                    descricao,
                    valor_bonus: valorBonus,
                    datBinicio: dataInicio,
                    data_fim: dataFim,
                });
                toast.success("Bônus criado com sucesso!");
            }
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar bônus.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">{bonus ? "Editar Bônus" : "Novo Bônus"}</h2>
                <label className="block mb-2">ID Usuário</label>
                <input
                    type="number"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                />
                <label className="block mb-2">ID Trajeto</label>
                <input
                    type="number"
                    value={idTrajeto}
                    onChange={(e) => setIdTrajeto(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                />
                <label className="block mb-2">Descrição</label>
                <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
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
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
                </div>
            </div>
        </div>
    );
}
