import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { ModalSuporte } from "./ModalSuporte";

export type SuporteProps = {
    id_suporte: number;
    id_usuario: number;
    usuario: string;
    id_tipo_suporte: number;
    tipo_suporte: string;
    id_funcionario: number;
    descricao: string;
    status: string;
    data_abertura: string;
    data_resolucao: string | null;
    criacao: string;
};

export function Suporte() {
    const [suportes, setSuportes] = useState<SuporteProps[]>([]);
    const [suporteSelecionado, setSuporteSelecionado] = useState<SuporteProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarsuportes();
    }, []);

    const carregarsuportes = async () => {
        try {
            const response = await api.get("/suporte-tecnico");
            setSuportes(response.data);
        } catch (error) {
            toast.error("Erro ao carregar suportes de suporte.");
        }
    };

    const handleEdit = (id: number) => {
        const suporte = suportes.find(c => c.id_suporte === id);
        if (suporte) {
            setSuporteSelecionado(suporte);
            setModalAberto(true);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este suporte?")) {
            try {
                await api.delete(`/suporte-tecnico/${id}`);
                setSuportes(suportes.filter(c => c.id_suporte !== id));
                toast.success("suporte excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir suporte.");
            }
        }
    };

    return (
        <div className="p-4 w-full max-h-full">
            <h1 className="text-xl font-bold mb-4">Suporte Técnico</h1>
            <button
                onClick={() => {
                    setSuporteSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Novo suporte
            </button>
            <table className="w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border text-left">ID</th>
                        <th className="px-4 py-2 border text-left">Usuário</th>
                        <th className="px-4 py-2 border text-left">Tipo de Suporte</th>
                        <th className="px-4 py-2 border text-left">Descrição</th>
                        <th className="px-6 py-3 border text-left">Data de Criação</th>
                        <th className="px-4 py-2 border text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {suportes.length > 0 ? (
                        suportes.map((suporte, index) => (
                            <tr key={suporte.id_suporte} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-300`}>
                                <td className="px-4 py-2 border">{suporte.id_suporte}</td>
                                <td className="px-4 py-3 border font-semibold">{suporte.usuario}</td>
                                <td className="px-4 py-2 border">{suporte.tipo_suporte}</td>
                                <td className="px-4 py-2 border">{suporte.descricao}</td>
                                <td className="px-4 py-2 border">{new Date(suporte.criacao).toLocaleDateString()}</td>
                                <td className="px-6 py-3 border flex space-x-2">
                                    <button onClick={() => handleEdit(suporte.id_suporte)} className="text-blue-600 hover:text-blue-800">
                                        <FaEdit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(suporte.id_suporte)} className="text-red-600 hover:text-red-800">
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-gray-500 py-4 text-center">
                                Nenhum suporte encontrado.
                            </td>
                        </tr>
                    )}

                    {modalAberto &&
                        <ModalSuporte
                            isOpen={modalAberto}
                            onClose={() => setModalAberto(false)}
                            suporteSelecionado={suporteSelecionado}
                        />
                    }
                </tbody>
            </table>
        </div>
    );
}