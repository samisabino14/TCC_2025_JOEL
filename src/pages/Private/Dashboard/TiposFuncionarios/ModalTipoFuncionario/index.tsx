import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";
import { TipoFuncionarioProps } from "..";

type ModalTipoFuncionarioProps = {
    isOpen: boolean;
    onClose: () => void;
    tipoFuncionario: TipoFuncionarioProps | null;
    onSave: (tipo: TipoFuncionarioProps) => void;
};

export function ModalTipoFuncionario({ isOpen, onClose, tipoFuncionario, onSave }: ModalTipoFuncionarioProps) {
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        setDescricao(tipoFuncionario ? tipoFuncionario.descricao : "");
    }, [tipoFuncionario]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            let response;
            if (tipoFuncionario) {
                response = await api.put(`/tipos-funcionario/${tipoFuncionario.id_tipo_funcionario}`, { descricao });
                toast.success("Tipo de funcionário atualizado com sucesso!");
            } else {
                response = await api.post("/tipos-funcionario", { descricao });
                toast.success("Tipo de funcionário criado com sucesso!");
            }

            onSave(response.data);
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar/editar tipo de funcionário.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                    {tipoFuncionario ? "Editar Tipo de Funcionário" : "Novo Tipo de Funcionário"}
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
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
