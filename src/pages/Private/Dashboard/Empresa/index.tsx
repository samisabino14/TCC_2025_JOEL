import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalEmpresa } from "./ModalEmpresa";

export type EmpresaProps = {
    id_empresa: number;
    nome: string;
    nif: string;
    email: string;
    telefone: string;
    endereco: string;
    localidade: number;
    nome_localidade: string;
    criacao: string;
};

export function Empresas() {
    const [empresas, setEmpresas] = useState<EmpresaProps[]>([]);
    const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarEmpresas();
    }, []);

    const carregarEmpresas = async () => {
        try {
            const response = await api.get("/empresas");
            setEmpresas(response.data);
        } catch {
            toast.error("Erro ao carregar empresas.");
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Deseja realmente excluir esta empresa?")) {
            try {
                await api.delete(`/empresas/${id}`);
                setEmpresas(empresas.filter(e => e.id_empresa !== id));
                toast.success("Empresa excluída com sucesso!");
            } catch {
                toast.error("Erro ao excluir empresa.");
            }
        }
    };

    return (
        <div className="p-4 w-full max-h-full">
            <h1 className="text-xl font-bold mb-4">Empresas</h1>
            <button
                onClick={() => {
                    setEmpresaSelecionada(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Nova empresa
            </button>
            <table className="w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border text-left">Nome</th>
                        <th className="px-4 py-2 border text-left">NIF</th>
                        <th className="px-4 py-2 border text-left">Email</th>
                        <th className="px-4 py-2 border text-left">Telefone</th>
                        <th className="px-4 py-2 border text-left">Endereço</th>
                        <th className="px-4 py-2 border text-left">Localidade</th>
                        <th className="px-4 py-2 border text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.length > 0 ? (
                        empresas.map((empresa, index) => (
                            <tr key={empresa.id_empresa} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                                <td className="px-4 py-2 border">{empresa.nome}</td>
                                <td className="px-4 py-2 border">{empresa.nif}</td>
                                <td className="px-4 py-2 border">{empresa.email}</td>
                                <td className="px-4 py-2 border">{empresa.telefone}</td>
                                <td className="px-4 py-2 border">{empresa.endereco}</td>
                                <td className="px-4 py-2 border">{empresa.nome_localidade}</td>
                                <td className="px-4 py-2 border flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setEmpresaSelecionada(empresa);
                                            setModalAberto(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(empresa.id_empresa)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan={7} className="text-center py-4 text-gray-500">Nenhuma empresa encontrada.</td></tr>
                    )}
                </tbody>
            </table>

            {modalAberto && (
                <ModalEmpresa
                    isOpen={modalAberto}
                    empresaSelecionada={empresaSelecionada}
                    onClose={() => setModalAberto(false)}
                    onRefresh={carregarEmpresas}
                />
            )}
        </div>
    );
}
