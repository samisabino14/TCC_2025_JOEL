import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { api } from "../../../../services/apiClient";
import { ModalTipoSuporte } from "./ModalTipoSuporte";

type TipoSuporteProps = {
    id_tipo_suporte: number;
    descricao: string;
    criacao: string;
    atualizacao: string;
};

export function TiposSuporte() {
    const [tiposSuporte, setTiposSuporte] = useState<TipoSuporteProps[]>([]);
    const [tipoSuporteSelecionado, setTipoSuporteSelecionado] = useState<TipoSuporteProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarTiposSuporte();
    }, []);

    const carregarTiposSuporte = async () => {
        try {
            const response = await api.get("/tipos-suporte");
            setTiposSuporte(response.data);
        } catch (error) {
            console.error("Erro ao carregar tipos de suporte", error);
        }
    };

    const handleEdit = (id: number) => {
        const tipoSuporte = tiposSuporte.find((t) => t.id_tipo_suporte === id);
        if (tipoSuporte) {
            setTipoSuporteSelecionado(tipoSuporte);
            setModalAberto(true);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este tipo de suporte?")) {
            try {
                await api.delete(`/tipos-suporte/${id}`);
                setTiposSuporte(tiposSuporte.filter((t) => t.id_tipo_suporte !== id));
                toast.success("Tipo de suporte excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir tipo de suporte.");
            }
        }
    };

    return (
        <div className="p-4 w-full max-h-full">
            <h1 className="text-xl font-bold mb-4">Tipos de Suporte</h1>
            <button
                onClick={() => {
                    setTipoSuporteSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Novo Tipo de Suporte
            </button>
            <div className="max-h-[500px] overflow-y-auto rounded-lg shadow-md border border-gray-300">
                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-6 py-3 border">ID</th>
                            <th className="px-6 py-3 border">Descrição</th>
                            <th className="px-6 py-3 border">Criado em</th>
                            <th className="px-6 py-3 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tiposSuporte.length > 0 ? (
                            tiposSuporte.map((tipo) => (
                                <tr key={tipo.id_tipo_suporte} className="hover:bg-gray-200">
                                    <td className="px-6 py-3 border">{tipo.id_tipo_suporte}</td>
                                    <td className="px-6 py-3 border font-semibold">{tipo.descricao}</td>
                                    <td className="px-6 py-3 border">{new Date(tipo.criacao).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 border flex space-x-2">
                                        <button onClick={() => handleEdit(tipo.id_tipo_suporte)} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(tipo.id_tipo_suporte)} className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-gray-500 py-4 text-center">
                                    Nenhum tipo de suporte encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalTipoSuporte
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                tipoSuporte={tipoSuporteSelecionado}
                atualizarLista={carregarTiposSuporte}
            />
        </div>
    );
}