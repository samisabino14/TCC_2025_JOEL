import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalTipoFuncionario } from "./ModalTipoFuncionario";

export type TipoFuncionarioProps = {
    id_tipo_funcionario: number;
    descricao: string;
    criacao: string;
    atualizacao: string;
};

export function TiposFuncionarios() {
    const [tipos, setTipos] = useState<TipoFuncionarioProps[]>([]);
    const [tipoSelecionado, setTipoSelecionado] = useState<TipoFuncionarioProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        fetchTipos();
    }, []);

    const fetchTipos = async () => {
        try {
            const response = await api.get(`/tipos-funcionario`);
            setTipos(response.data);
        } catch (error) {
            toast.error("Erro ao buscar tipos de funcionários.");
        }
    };

    const handleSave = (tipoAtualizado: TipoFuncionarioProps) => {
        setTipos((prev) => {
            const existe = prev.some((t) => t.id_tipo_funcionario === tipoAtualizado.id_tipo_funcionario);
            return existe
                ? prev.map((t) => (t.id_tipo_funcionario === tipoAtualizado.id_tipo_funcionario ? tipoAtualizado : t))
                : [...prev, tipoAtualizado];
        });
        setModalAberto(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este tipo de funcionário?")) {
            try {
                await api.delete(`/tipos-funcionario/${id}`);
                setTipos((prev) => prev.filter((tipo) => tipo.id_tipo_funcionario !== id));
                toast.success("Tipo de funcionário excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir tipo de funcionário.");
            }
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Tipos de Funcionários</h1>

            <button
                onClick={() => {
                    setTipoSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Novo Tipo de Funcionário
            </button>

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
                                        <button onClick={() => { setTipoSelecionado(tipo); setModalAberto(true); }} className="text-blue-600 hover:text-blue-800">
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

            {modalAberto && (
                <ModalTipoFuncionario
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    tipoFuncionario={tipoSelecionado}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
