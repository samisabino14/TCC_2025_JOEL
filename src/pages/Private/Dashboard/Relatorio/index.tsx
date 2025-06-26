import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import { ModalRelatorio } from "./ModalRelatorio";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";

export type RelatorioProps = {
    id_relatorio: number;
    tipo_relatorio: string;
    id_funcionario?: number;
    data_inicio?: string;
    data_fim?: string;
    data_geracao: string;
    arquivo?: string;
};

export function Relatorio() {
    const [relatorios, setRelatorios] = useState<RelatorioProps[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [relatorioEditando, setRelatorioEditando] = useState<RelatorioProps | null>(null);

    useEffect(() => {
        buscarRelatorios();
    }, []);

    const buscarRelatorios = async () => {
        try {
            const response = await api.get("/relatorios");
            setRelatorios(response.data);
        } catch (error) {
            toast.error("Erro ao buscar relatórios.");
        }
    };

    const handleSalvarRelatorio = async (relatorio: Omit<RelatorioProps, "id_relatorio">) => {
        try {
            if (relatorioEditando) {
                await api.put(`/relatorios/${relatorioEditando.id_relatorio}`, relatorio);
                toast.success("Relatório atualizado com sucesso!");
            } else {
                await api.post("/relatorios", relatorio);
            }
            buscarRelatorios();
            setModalAberto(false);
            setRelatorioEditando(null);
        } catch (error) {
            toast.error("Erro ao salvar relatório.");
        }
    };

    const abrirModal = (relatorio?: RelatorioProps) => {
        setRelatorioEditando(relatorio || null);
        setModalAberto(true);
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Relatórios</h1>
            <button
                onClick={() => setModalAberto(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                <FiEdit size={18} />
                <span>Adicionar Relatório</span>
            </button>
            <table className="min-w-full border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Tipo</th>
                        <th className="px-4 py-2">Funcionário</th>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Arquivo</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {relatorios.map((relatorio) => (
                        <tr key={relatorio.id_relatorio} className="border-t">
                            <td className="px-4 py-2 text-center">{relatorio.id_relatorio}</td>
                            <td className="px-4 py-2 text-center">{relatorio.tipo_relatorio}</td>
                            <td className="px-4 py-2 text-center">{relatorio.data_geracao}</td>
                            <td className="px-4 py-2 text-center">
                                {relatorio.arquivo ? (
                                    <a
                                        href={relatorio.arquivo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Baixar
                                    </a>
                                ) : (
                                    <span className="text-gray-400">Nenhum</span>
                                )}
                            </td>
                            <td className="px-4 py-2 flex space-x-3 justify-center">
                                <button
                                    onClick={() => abrirModal(relatorio)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FiEdit size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalAberto && (
                <ModalRelatorio
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    onSave={handleSalvarRelatorio}
                    relatorio={relatorioEditando}
                />
            )}
        </div>
    );
}