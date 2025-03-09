import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export type TipoFuncionarioProps = {
    id_tipo_funcionario: number;
    descricao: string;
    criacao: string;
    atualizacao: string;
};

export function TiposFuncionarios() {
    const [tipos, setTipos] = useState<TipoFuncionarioProps[]>([]);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get(`/tipos-funcionario`);
                console.log(response.data);
                setTipos(response.data);
            } catch (error) {
                console.log(error);

                toast.error("Erro ao buscar tipos de funcionários.");
            }
        };

        fetchDados();
    }, []);

    const handleEdit = (id: number) => {
        alert(`Editar tipo de funcionário: ${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este tipo de funcionário?")) {
            try {
                await api.delete(`/tipos-funcionarios/${id}`);
                setTipos(tipos.filter((tipo) => tipo.id_tipo_funcionario !== id));
                toast.success("Tipo de funcionário excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir tipo de funcionário.");
            }
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Tipos de Funcionários</h1>
            <div className="overflow-x-auto overflow-y-auto max-h-96 border border-gray-300 rounded-lg shadow-md">
                <table className="min-w-full bg-white">
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
                        {tipos.length > 0 ? (
                            tipos.map((tipo, index) => (
                                <tr key={tipo.id_tipo_funcionario} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="px-4 py-2 border">{tipo.id_tipo_funcionario}</td>
                                    <td className="px-4 py-2 border font-semibold">{tipo.descricao}</td>
                                    <td className="px-4 py-2 border text-gray-500">{new Date(tipo.criacao).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border text-gray-500">{new Date(tipo.atualizacao).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border flex gap-2">
                                        <button onClick={() => handleEdit(tipo.id_tipo_funcionario)} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(tipo.id_tipo_funcionario)} className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-gray-500">Nenhum tipo de funcionário encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
