import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";

export type TipoSuporteProps = {
    id_tipo_suporte?: number;
    descricao: string;
};

type ModalTipoSuporteProps = {
    isOpen: boolean;
    onClose: () => void;
    tipoSuporte?: TipoSuporteProps | null;
    atualizarLista: () => void;
};

export function ModalTipoSuporte({ isOpen, onClose, tipoSuporte, atualizarLista }: ModalTipoSuporteProps) {
    const [descricao, setDescricao] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        if (tipoSuporte) {
            setDescricao(tipoSuporte.descricao);
        } else {
            setDescricao("");
        }
    }, [tipoSuporte]);

    const handleSave = async () => {
        if (!descricao.trim()) {
            toast.error("A descrição é obrigatória.");
            return;
        }
        setCarregando(true);
        try {
            if (tipoSuporte) {
                await api.put(`/tipos_suporte/${tipoSuporte.id_tipo_suporte}`, { descricao });
                toast.success("Tipo de suporte atualizado com sucesso!");
            } else {
                await api.post("/tipos_suporte", { descricao });
                toast.success("Tipo de suporte criado com sucesso!");
            }
            atualizarLista();
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar tipo de suporte.");
        } finally {
            setCarregando(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">{tipoSuporte ? "Editar Tipo de Suporte" : "Novo Tipo de Suporte"}</h2>
                <label className="block mb-2">Descrição</label>
                <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="p-2 bg-gray-400 text-white rounded">Cancelar</button>
                    <button 
                        onClick={handleSave} 
                        className={`p-2 text-white rounded ${carregando ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
                        disabled={carregando}
                    >
                        {carregando ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
