import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";
import { PromocaoProps } from "..";


type ModalPromocaoProps = {
    isOpen: boolean;
    onClose: () => void;
    promocao: PromocaoProps | null;
};

export function ModalPromocao({ isOpen, onClose, promocao }: ModalPromocaoProps) {
    const [idTrajeto, setIdTrajeto] = useState(0);
    const [criadoPor, setCriadoPor] = useState(0);
    const [descontoPercentual, setDescontoPercentual] = useState(15);
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [status, setStatus] = useState(true);
    const [trajetos, setTrajetos] = useState<{ id_trajeto: number; nome: string }[]>([]);

    useEffect(() => {
        carregarTrajetos();
        if (promocao) {
            setIdTrajeto(promocao.id_trajeto);
            setCriadoPor(promocao.criado_por);
            setDescontoPercentual(promocao.desconto_percentual);
            setDescricao(promocao.descricao);
            setDataInicio(promocao.data_inicio);
            setDataFim(promocao.data_fim);
            setStatus(promocao.status);
        } else {
            resetForm();
        }
    }, [promocao]);

    const carregarTrajetos = async () => {
        try {
            const response = await api.get("/trajetos");
            setTrajetos(response.data);
        } catch (error) {
            toast.error("Erro ao carregar trajetos.");
        }
    };

    const resetForm = () => {
        setIdTrajeto(0);
        setCriadoPor(0);
        setDescontoPercentual(15);
        setDescricao("");
        setDataInicio("");
        setDataFim("");
        setStatus(true);
    };

    const handleSave = async () => {
        if (!idTrajeto || !descricao || !dataInicio || !dataFim) {
            toast.error("Preencha todos os campos.");
            return;
        }
        try {
            if (promocao) {
                await api.put(`/promocoes/${promocao.id_promocao}`, {
                    id_trajeto: idTrajeto,
                    criado_por: criadoPor,
                    desconto_percentual: descontoPercentual,
                    descricao,
                    data_inicio: dataInicio,
                    data_fim: dataFim,
                    status,
                });
                toast.success("Promoção atualizada com sucesso!");
            } else {
                await api.post("/promocoes", {
                    id_trajeto: idTrajeto,
                    criado_por: criadoPor,
                    desconto_percentual: descontoPercentual,
                    descricao,
                    data_inicio: dataInicio,
                    data_fim: dataFim,
                    status,
                });
                toast.success("Promoção criada com sucesso!");
            }
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar promoção.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{promocao ? "Editar Promoção" : "Nova Promoção"}</h2>
                <label className="block mb-2">Trajeto</label>
                <select
                    value={idTrajeto}
                    onChange={(e) => setIdTrajeto(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value="">Selecione um trajeto</option>
                    {trajetos.map((trajeto) => (
                        <option key={trajeto.id_trajeto} value={trajeto.id_trajeto}>{trajeto.nome}</option>
                    ))}
                </select>
                <label className="block mb-2">Criado por</label>
                <input
                    type="text"
                    value={criadoPor}
                    onChange={(e) => setCriadoPor(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                />
                <label className="block mb-2">Desconto (%)</label>
                <input
                    type="number"
                    value={descontoPercentual}
                    onChange={(e) => setDescontoPercentual(Number(e.target.value))}
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
                <label className="block mb-2 flex items-center">
                    <input
                        type="checkbox"
                        checked={status}
                        onChange={() => setStatus(!status)}
                        className="mr-2"
                    />
                    Ativo
                </label>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar</button>
                </div>
            </div>
        </div>
    );
}
