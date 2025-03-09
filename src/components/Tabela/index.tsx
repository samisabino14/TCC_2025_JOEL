import { FaEdit, FaTrash } from "react-icons/fa";
import { UsuarioProps } from "../../pages/Private/Dashboard/Usuarios";


type TabelaProps = {
    dados: UsuarioProps[];
    setUsuarioSelecionado: React.Dispatch<React.SetStateAction<UsuarioProps | null>>;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export function Tabela({ dados, setUsuarioSelecionado, onEdit, onDelete }: TabelaProps) {
    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Telefone</th>
                        <th className="px-4 py-2">Tipo</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((usuario, index) => (
                        <tr key={usuario.id_pessoa} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                            <td className="px-4 py-2 border">{usuario.nome}</td>
                            <td className="px-4 py-2 border">{usuario.email}</td>
                            <td className="px-4 py-2 border">{usuario.telefone}</td>
                            <td className="px-4 py-2 border">{usuario.tipo_usuario}</td>
                            <td className="px-4 py-2 border flex gap-3">
                                <button
                                    onClick={() => {
                                        setUsuarioSelecionado(usuario);
                                        onEdit(usuario.id_usuario);
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(usuario.id_usuario)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
