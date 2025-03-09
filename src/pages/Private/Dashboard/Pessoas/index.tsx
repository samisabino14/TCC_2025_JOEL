import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { PessoaProps, Tabela } from "./Tabela";

export function Pessoas() {
    const [pessoas, setPessoas] = useState<PessoaProps[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [pessoaSelecionada, setPessoaSelecionada] = useState<PessoaProps | null>(null);

    // Função para buscar pessoas da API
    useEffect(() => {
        const fetchPessoas = async () => {
            try {
                const response = await api.get("/pessoas");
                setPessoas(response.data);
            } catch (error) {
                toast.error("Erro ao carregar pessoas.");
            }
        };

        fetchPessoas();
    }, []);

    // Função para abrir o modal de edição
    const handleEdit = (id: number) => {
        const pessoa = pessoas.find((p) => p.id_pessoa === id);
        if (pessoa) {
            setPessoaSelecionada(pessoa);
            setModalAberto(true);
        }
    };

    // Função para excluir uma pessoa
    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta pessoa?")) {
            try {
                await api.delete(`/pessoas/${id}`);
                setPessoas(pessoas.filter((pessoa) => pessoa.id_pessoa !== id));
                toast.success("Pessoa excluída com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir pessoa.");
            }
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Pessoas</h1>

            {/* Botão para adicionar nova pessoa */}
            <button
                onClick={() => {
                    setPessoaSelecionada(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Nova Pessoa
            </button>

            {/* Tabela de Pessoas */}
            <Tabela dados={pessoas} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Modal de Cadastro/Edição (implementação futura) */}
        </div>
    );
}
