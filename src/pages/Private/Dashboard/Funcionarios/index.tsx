import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { ModalFuncionario } from "./ModalFuncionario";
import { UsuarioByID } from "../../../../components/Private/UsuarioByID";
import { TipoFuncionarioByID } from "../../../../components/Private/TipoFuncionarioByID";

export type FuncionarioProps = {
    id_funcionario: number;
    id_usuario: number;
    usuario: string;
    id_tipo_funcionario: number;
    tipo_funcionario: string;
    criacao: string;
    atualizacao: string;
};

export function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState<FuncionarioProps[]>([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<FuncionarioProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    const carregarFuncionarios = async () => {
        try {
            const response = await api.get(`/funcionarios`);
            setFuncionarios(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error("Falha ao carregar funcionários.");
        }
    };

    const handleEdit = (id: number) => {
        const funcionario = funcionarios.find((f) => f.id_funcionario === id);
        if (funcionario) {
            setFuncionarioSelecionado(funcionario);
            setModalAberto(true);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
            try {
                await api.delete(`/funcionarios/${id}`);
                setFuncionarios(funcionarios.filter((f) => f.id_funcionario !== id));
                toast.success("Funcionário excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir funcionário.");
            }
        };
    }

    return (
        <div className="p-4 w-full max-h-full">
            <h1 className="text-xl font-bold mb-4">Funcionários</h1>
            <button
                onClick={() => {
                    setFuncionarioSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Novo Funcionário
            </button>
            <div className="max-h-[500px] overflow-y-auto rounded-lg shadow-md border border-gray-300">
                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border text-left">ID</th>
                            <th className="px-6 py-3 text-left">Usuário</th>
                            <th className="px-6 py-3 text-left">Tipo de Funcionário</th>
                            <th className="px-6 py-3 text-left">Criação</th>
                            <th className="px-6 py-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.length > 0 ? (
                            funcionarios.map((funcionario, index) => (
                                <tr key={funcionario.id_funcionario} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                                    <td className="px-6 py-3 border">{funcionario.id_funcionario}</td>
                                    <td className="px-6 py-3 border font-semibold"><UsuarioByID id_usuario={funcionario.id_usuario} /></td>
                                    <td className="px-6 py-3 border"><TipoFuncionarioByID id_tipo_funcionario={funcionario.id_tipo_funcionario} /></td>
                                    <td className="px-6 py-3 border">{new Date(funcionario.criacao).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 border flex space-x-2">
                                        <button onClick={() => handleEdit(funcionario.id_funcionario)} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(funcionario.id_funcionario)} className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-gray-500 py-4 text-center">
                                    Nenhum funcionário encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {modalAberto && (
                <ModalFuncionario
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    funcionario={funcionarioSelecionado}
                />
            )}
        </div>
    );
}
