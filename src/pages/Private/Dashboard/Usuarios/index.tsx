import { useEffect, useState } from "react";
import { Tabela } from "../../../../components/Tabela";
import { api } from "../../../../services/apiClient";
import { ErrorResponse } from "../../../../App";
import toast from "react-hot-toast";
import { ModalUsuario } from "./ModalUsuario";

export type UsuarioProps = {
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
    id_usuario: number;
    tipo_usuario: string;
};


export function Usuarios() {
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get(`/usuarios`);
                setUsuarios(response.data);
            } catch (error) {
                const err = error as ErrorResponse;
                toast.error(err?.response?.data?.mensagem || "Falha na conexão de rede.");
            }
        };

        fetchDados();
    }, []);

    // Função para abrir modal de edição
    const handleEdit = (id: number) => {
        console.log(usuarios)
        const usuario = usuarios.find((d) => d.id_pessoa === id);
        if (usuario) {
            setUsuarioSelecionado(usuario);
            setModalAberto(true);
        }
    };

    // Função para excluir usuário com chamada à API
    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                await api.delete(`/usuarios/${id}`);
                setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
                toast.success("Usuário excluído com sucesso!");
            } catch (error) {
                console.log(error)
                toast.error("Erro ao excluir usuário.");
            }
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Usuários</h1>

            {/* Botão para adicionar novo usuário */}
            <button
                onClick={() => {
                    setUsuarioSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Novo Usuário
            </button>

            <Tabela
                dados={usuarios}
                setUsuarioSelecionado={setUsuarioSelecionado}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal de Cadastro/Edição */}
            {modalAberto && (
                <ModalUsuario
                    isOpen={modalAberto} // ✅ Correto
                    usuario={usuarioSelecionado}
                    onClose={() => setModalAberto(false)}
                    onSave={(novoUsuario: UsuarioProps) => {
                        if (usuarioSelecionado) {
                            setUsuarios(usuarios.map((u) => (u.id_pessoa === novoUsuario.id_pessoa ? novoUsuario : u)));
                        } else {
                            setUsuarios([...usuarios, novoUsuario]);
                        }
                        setModalAberto(false);
                    }}
                />

            )}
        </div>
    );
}
