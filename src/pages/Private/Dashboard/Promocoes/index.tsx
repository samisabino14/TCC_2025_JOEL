import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { ModalPromocao } from "./ModalPromocao";
import { api } from "../../../../services/apiClient";

export type PromocaoProps = {
    id_promocao: number;
    id_trajeto: number;
    trajeto: string;
    criado_por: number;
    descricao: string;
    desconto_percentual: number;
    desconto: number;
    data_inicio: string;
    data_fim: string;
    status: boolean;
};

export function Promocoes() {
    const [promocoes, setPromocoes] = useState<PromocaoProps[]>([]);
    const [promocaoSelecionada, setPromocaoSelecionada] = useState<PromocaoProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarPromocoes();
    }, []);

    const carregarPromocoes = async () => {
        try {
            const response = await api.get("/promocoes");
            setPromocoes(response.data);
        } catch (error) {
            toast.error("Erro ao carregar promoções.");
        }
    };

    const handleEdit = (id: number) => {
        const promocao = promocoes.find((p) => p.id_promocao === id);
        if (promocao) {
            setPromocaoSelecionada(promocao);
            setModalAberto(true);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta promoção?")) {
            try {
                await api.delete(`/promocoes/${id}`);
                setPromocoes(promocoes.filter((p) => p.id_promocao !== id));
                toast.success("Promoção excluída com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir promoção.");
            }
        }
    };

    return (
        <div className="p-4 w-full max-h-full">
            <h1 className="text-xl font-bold mb-4">Promoções</h1>
            <button
                onClick={() => {
                    setPromocaoSelecionada(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Nova Promoção
            </button>
            <div className="max-h-[500px] overflow-y-auto rounded-lg shadow-md border border-gray-300">
                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border text-left">ID</th>
                            <th className="px-6 py-3 border text-left">Trajeto</th>
                            <th className="px-6 py-3 border text-left">Criado Por</th>
                            <th className="px-6 py-3 border text-left">Descrição</th>
                            <th className="px-6 py-3 border text-left">Desconto (%)</th>
                            <th className="px-6 py-3 border text-left">Data Início</th>
                            <th className="px-6 py-3 border text-left">Data Fim</th>
                            <th className="px-6 py-3 border text-left">Status</th>
                            <th className="px-6 py-3 border text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promocoes.length > 0 ? (
                            promocoes.map((promocao, index) => (
                                <tr key={promocao.id_promocao} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                                    <td className="px-6 py-3 border">{promocao.id_promocao}</td>
                                    <td className="px-6 py-3 border">{promocao.trajeto}</td>
                                    <td className="px-6 py-3 border">{promocao.criado_por}</td>
                                    <td className="px-6 py-3 border">{promocao.descricao}</td>
                                    <td className="px-6 py-3 border">{promocao.desconto_percentual}%</td>
                                    <td className="px-6 py-3 border">{new Date(promocao.data_inicio).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 border">{new Date(promocao.data_fim).toLocaleDateString()}</td>
                                    <td className={`px-6 py-3 border ${promocao.status ? 'text-green-600' : 'text-red-600'}`}>
                                        {promocao.status ? "Ativa" : "Inativa"}
                                    </td>
                                    <td className="px-6 py-3 border flex space-x-2">
                                        <button onClick={() => handleEdit(promocao.id_promocao)} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(promocao.id_promocao)} className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-gray-500 py-4 text-center">
                                    Nenhuma promoção encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalPromocao
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                promocao={promocaoSelecionada}
            />
        </div>
    );
}
