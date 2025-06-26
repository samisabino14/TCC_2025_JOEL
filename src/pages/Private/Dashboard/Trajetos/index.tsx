import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatarNumero } from "../../Utilizador/MinhasReservas/Nova";
import { ModalTrajeto } from "./ModalTrajeto";
import { ErrorResponse } from "../../../../App";

export type TrajetoProps = {
    id_trajeto: number;
    id_partida: number;
    partida: string;
    destino: string;
    id_destino: number;
    lotacao: number;
    preco: number;
    percentual_parcela_inicial: number;
    criacao: string;
};

export function Trajetos() {
    const [trajetos, setTrajetos] = useState<TrajetoProps[]>([]);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get("/trajetos");
                setTrajetos(response.data);
            } catch (error) {
                const err = error as ErrorResponse;
                if (err?.response?.data?.erro) {
                    toast.error(err.response.data.erro);
                }
                else {
                    toast.error("Falha na conexão de rede.");
                }
            }
        };
        fetchDados();
    }, []);

    const handleEdit = () => {
        setModalAberto(true)
    };

    async function handleSaveTrajeto(novoTrajeto: Omit<TrajetoProps, "id_trajeto" | "partida" | "destino" | "criacao" | "atualizacao">) {
        try {
            const trajetoFormatado = {
                id_partida: Number(novoTrajeto.id_partida),
                id_destino: Number(novoTrajeto.id_destino),
                lotacao: Number(novoTrajeto.lotacao),
                preco: parseFloat(novoTrajeto.preco.toString()).toFixed(2), // Garante que seja enviado como string decimal
                percentual_parcela_inicial: parseFloat(novoTrajeto.percentual_parcela_inicial.toString()).toFixed(2),
            };
            await api.post("/trajetos", trajetoFormatado);
            toast.success("Trajeto criado com sucesso!");
            //return response.data;
        } catch (error) {
            console.error("Erro ao criar trajeto:", error);
            toast.error("Erro ao criar trajeto.");
            throw error;
        }
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este trajeto?")) {
            try {
                await api.delete(`/trajetos/${id}`);
                setTrajetos(trajetos.filter((trajeto) => trajeto.id_trajeto !== id));
                toast.success("Trajeto excluído com sucesso!");
            } catch (error) {
                const err = error as ErrorResponse;
                if (err?.response?.data?.erro) {
                    toast.error(err.response.data.erro);
                }
                else {
                    toast.error("Falha na conexão de rede.");
                }
            }
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Trajetos</h1>
            <button
                onClick={() => setModalAberto(true)}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Adicionar Novo Trajeto
            </button>
            <div className="overflow-y-auto max-h-96 rounded-lg shadow-md border border-gray-300">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Partida</th>
                            <th className="px-4 py-2 text-left">Destino</th>
                            <th className="px-4 py-2 text-left">Lotação</th>
                            <th className="px-4 py-2 text-left">Preço</th>
                            <th className="px-4 py-2 text-left">Parcela Inicial (%)</th>
                            <th className="px-4 py-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trajetos.length > 0 ? (
                            trajetos.map((trajeto, index) => (
                                <tr
                                    key={trajeto.id_trajeto}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                >
                                    <td className="px-4 py-2 border">{trajeto.id_trajeto}</td>
                                    <td className="px-4 py-2 border">{trajeto.partida}</td>
                                    <td className="px-4 py-2 border">{trajeto.destino}</td>
                                    <td className="px-4 py-2 border">{trajeto.lotacao}</td>
                                    <td className="px-4 py-2 border">{formatarNumero(Number(trajeto?.preco))} Kzs</td>
                                    <td className="px-4 py-2 border">{Number(trajeto.percentual_parcela_inicial).toFixed(0)}%</td>
                                    <td className="px-4 py-2 border flex gap-2">
                                        <button
                                            onClick={() => handleEdit()}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(trajeto.id_trajeto)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    Nenhum trajeto encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalAberto && (
                <ModalTrajeto isOpen={modalAberto} onClose={() => setModalAberto(false)} onSave={handleSaveTrajeto} />
            )}
        </div>
    );
}
