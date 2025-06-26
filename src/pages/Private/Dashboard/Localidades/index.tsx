import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { Tabela } from "./Tabela";
import { ModalLocalidade } from "./ModalLocalidade";

export type LocalidadeProps = {
    id_localidade: number;
    nome: string;
    localidade_pai: number | null;
    criacao: string;
    atualizacao: string;
};

export function Localidades() {
    const [localidades, setLocalidades] = useState<LocalidadeProps[]>([]);
    const [localidadeSelecionada, setLocalidadeSelecionada] = useState<LocalidadeProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get(`/localidades`);
                setLocalidades(response.data);
            } catch (error) {
                toast.error("Falha ao carregar localidades.");
            }
        };

        fetchDados();
    }, []);

    // Função para editar localidade
    const handleEdit = (id: number) => {
        const localidade = localidades.find((d) => d.id_localidade === id);
        if (localidade) {
            setLocalidadeSelecionada(localidade);
            setModalAberto(true);
        }
    };

    // Função para excluir localidade com chamada à API
    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta localidade?")) {
            try {
                await api.delete(`/localidades/${id}`);
                setLocalidades(localidades.filter((localidade) => localidade.id_localidade !== id));
                toast.success("Localidade excluída com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir localidade.");
            }
        }
    };

    return (
        <div className="w-full p-4 max-h-full">
            <h1 className="text-xl font-bold mb-4">Localidades</h1>

            {/* Botão para adicionar nova localidade */}
            <button
                onClick={() => {
                    setLocalidadeSelecionada(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Nova Localidade
            </button>

            <Tabela
                dados={localidades}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {modalAberto && <ModalLocalidade
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                localidade={localidadeSelecionada}
            />
            }
        </div>
    );
}
