import { FaEdit, FaTrash } from "react-icons/fa";

export type PessoaProps = {
    id_pessoa: number;
    nome: string;
    localidade: number;
    bairro: string | null;
    rua: string | null;
    bilhete_identidade: string;
    email: string;
    telefone: string;
    genero: string;
    data_nascimento: string;
};

type TabelaProps = {
    dados: PessoaProps[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export function Tabela({ dados, onEdit, onDelete }: TabelaProps) {
    return (
        <div className="w-full overflow-auto max-h-[500px] border rounded-lg shadow-md">
            <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">BI</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Telefone</th>
                        <th className="px-4 py-2">Gênero</th>
                        <th className="px-4 py-2">Nascimento</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.length > 0 ? (
                        dados.map((pessoa, index) => (
                            <tr
                                key={pessoa.id_pessoa}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-gray-200 transition`}
                            >
                                <td className="px-4 py-2 border">{pessoa.id_pessoa}</td>
                                <td className="px-4 py-2 border">{pessoa.nome}</td>
                                <td className="px-4 py-2 border">{pessoa.bilhete_identidade}</td>
                                <td className="px-4 py-2 border">{pessoa.email}</td>
                                <td className="px-4 py-2 border">{pessoa.telefone}</td>
                                <td className="px-4 py-2 border">{pessoa.genero}</td>
                                <td className="px-4 py-2 border">{new Date(pessoa.data_nascimento).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border flex gap-2">
                                    
                                    <button
                                        onClick={() => onDelete(pessoa.id_pessoa)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11} className="text-center py-4 text-gray-500">
                                Nenhuma pessoa encontrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
