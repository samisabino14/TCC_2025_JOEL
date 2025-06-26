import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";
import { TipoUsuarioProps } from "..";

type ModalTipoUsuarioProps = {
    isOpen: boolean;
    onClose: () => void;
    tipoUsuario: TipoUsuarioProps | null;
};

export function ModalTipoUsuario({ isOpen, onClose, tipoUsuario }: ModalTipoUsuarioProps) {
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if (tipoUsuario) {
            setDescricao(tipoUsuario.descricao);
        } else {
            setDescricao("");
        }
    }, [tipoUsuario]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (tipoUsuario) {
                await api.put(`/tipos-usuario/${tipoUsuario.id_tipo_usuario}`, { descricao });
                toast.success("Tipo de usuário atualizado com sucesso!");
            } else {
                await api.post("/tipos-usuario", { descricao });
                toast.success("Tipo de usuário criado com sucesso!");
            }
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar tipo de usuário.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                    {tipoUsuario ? "Editar Tipo de Usuário" : "Novo Tipo de Usuário"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Descrição</label>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
