import { FaEdit, FaTrash } from "react-icons/fa";
import { LocalidadeProps } from "..";

type TabelaProps = {
    dados: LocalidadeProps[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export function Tabela({ dados, onEdit, onDelete }: TabelaProps) {

    return (
        <div className="w-full overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto rounded-lg shadow-md border border-gray-300">
                <table className="w-full bg-white shadow-lg rounded-lg">
                    {/* Cabeçalho fixo */}
                    <thead className="bg-gray-700 text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Nome</th>
                            <th className="px-6 py-3 text-left">Localidade Pai</th>
                            <th className="px-6 py-3 text-left">Criado em</th>
                            <th className="px-6 py-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.length > 0 ? (
                            dados.map((dado, index) => (
                                <tr
                                    key={dado.id_localidade}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        } hover:bg-gray-200 transition`}
                                >
                                    <td className="px-6 py-3 border">{dado.id_localidade}</td>
                                    <td className="px-6 py-3 border font-semibold">{dado.nome}</td>
                                    <td className="px-6 py-3 border text-gray-600">
                                        {dado.localidade_pai || "N/A"}
                                    </td>
                                    <td className="px-6 py-3 border text-gray-500">
                                        {new Date(dado.criacao).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3 border flex gap-2">
                                        <button
                                            onClick={() => onEdit(dado.id_localidade)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(dado.id_localidade)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    Nenhuma localidade encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
