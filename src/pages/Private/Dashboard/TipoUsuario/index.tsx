import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalTipoUsuario } from "./ModalTipoUsuario";

export type TipoUsuarioProps = {
    id_tipo_usuario: number;
    descricao: string;
    criacao: string;
    atualizacao: string;
};

export function TipoUsuario() {
    const [tiposUsuarios, setTiposUsuarios] = useState<TipoUsuarioProps[]>([]);
    const [tipoSelecionado, setTipoSelecionado] = useState<TipoUsuarioProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get(`/tipos-usuario`);
                setTiposUsuarios(response.data);
            } catch (error) {
                toast.error("Erro ao buscar os tipos de usuário.");
            }
        };

        fetchDados();
    }, []);

    const handleEdit = (id: number) => {
        const tipo = tiposUsuarios.find((t) => t.id_tipo_usuario === id);
        if (tipo) {
            setTipoSelecionado(tipo);
            setModalAberto(true);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este tipo de usuário?")) {
            try {
                await api.delete(`/tipos-usuario/${id}`);
                setTiposUsuarios(tiposUsuarios.filter((tipo) => tipo.id_tipo_usuario !== id));
                toast.success("Tipo de usuário excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir tipo de usuário.");
            }
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Tipos de Usuário</h1>

            <button
                onClick={() => {
                    setTipoSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Novo Tipo de Usuário
            </button>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Descrição</th>
                                <th className="px-4 py-2 text-left">Criado em</th>
                                <th className="px-4 py-2 text-left">Atualizado em</th>
                                <th className="px-4 py-2 text-left">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiposUsuarios.length > 0 ? (
                                tiposUsuarios.map((tipo, index) => (
                                    <tr
                                        key={tipo.id_tipo_usuario}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        } hover:bg-gray-200 transition`}
                                    >
                                        <td className="px-4 py-2 border">{tipo.id_tipo_usuario}</td>
                                        <td className="px-4 py-2 border font-semibold">{tipo.descricao}</td>
                                        <td className="px-4 py-2 border text-gray-500">
                                            {new Date(tipo.criacao).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 border text-gray-500">
                                            {new Date(tipo.atualizacao).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 border flex gap-2">
                                            <button onClick={() => handleEdit(tipo.id_tipo_usuario)} className="text-blue-600 hover:text-blue-800">
                                                <FaEdit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(tipo.id_tipo_usuario)} className="text-red-600 hover:text-red-800">
                                                <FaTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        Nenhum tipo de usuário encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalAberto && (
                <ModalTipoUsuario
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    tipoUsuario={tipoSelecionado}
                />
            )}
        </div>
    );
}
