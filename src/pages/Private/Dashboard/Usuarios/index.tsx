import { useEffect, useState } from "react";
import { Tabela } from "../../../../components/Tabela";
import { api } from "../../../../services/apiClient";
import { ErrorResponse } from "../../../../App";
import toast from "react-hot-toast";
import { CountryProps, ModalUsuario } from "./ModalUsuario";

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
    tipo_usuario: number;
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
        const usuario = usuarios.find((d) => d.id_usuario === id);

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
                toast.error("Erro ao excluir usuário.");
            }
        }
    };

    const onSave = async (novoUsuario: UsuarioProps, selectedCountry: CountryProps | null, selectedNationality: CountryProps | null) => {

        if (usuarioSelecionado) {
            setUsuarios(usuarios.map((u) => (u.id_pessoa === novoUsuario.id_pessoa ? novoUsuario : u)));
        } else {
            //setUsuarios([...usuarios, novoUsuario]);

            
            if (novoUsuario.nome === '' || novoUsuario.email === '' || novoUsuario.data_nascimento === '' || novoUsuario.telefone === '' || novoUsuario.bilhete_identidade === '' || novoUsuario.genero === '' || novoUsuario.localidade === 0) {
                toast.error("Preencha todos os campos!");
                return;
            }
            
            if (!selectedCountry?.code) {
                toast.error(`Selecione o indicativo do teu país!`);
                return;
            }

            if (selectedCountry.code === "+244" && novoUsuario.telefone.length < 9 || novoUsuario.telefone.length > 9) {
                toast.error(`O telefone deve conter 9 dígitos!`);
                return;
            }

            if (!selectedNationality?.name) {
                toast.error(`Selecione a tua nacionalidade!`);
                return;
            }

            const phone = selectedCountry.code + novoUsuario.telefone

            //setLoading(true);

            try {
                
                const response = await api.post("pessoas", {
                    "nome": novoUsuario.nome,
                    "bilhete_identidade": novoUsuario.bilhete_identidade,
                    "genero": novoUsuario.genero,
                    "email": novoUsuario.email,
                    "data_nascimento": novoUsuario.data_nascimento,
                    "telefone": phone,
                    "localidade": novoUsuario.localidade,
                    "nacionalidade": selectedNationality.name === "Angola" ? "angolana" : "estrangeira"
                });

                const insertId = response.data.pessoa[0].insertId;

                await api.post("usuarios", {
                    id_pessoa: insertId,
                    senha: '123456',
                    id_tipo_usuario: novoUsuario.tipo_usuario
                })

                toast.success("Cadastrado com sucesso.");

            } catch (error) {
                const err = error as ErrorResponse;
                if (err?.response?.data?.erro) {
                    toast.error(err.response.data.erro);
                }
                else {
                    toast.error("Falha na conexão de rede.");
                }
            } finally {
                //setLoading(false);
            }
        }

        setModalAberto(false);
    }

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
                    onSave={onSave}
                />

            )}
        </div>
    );
}
