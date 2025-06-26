import { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";
import { LocalidadeProps } from "..";

type ModalLocalidadeProps = {
    isOpen: boolean;
    onClose: () => void;
    localidade: LocalidadeProps | null;
};

export function ModalLocalidade({ isOpen, onClose, localidade }: ModalLocalidadeProps) {
    const [nome, setNome] = useState("");
    const [localidadePai, setLocalidadePai] = useState<number | null>(null);
    const [todasLocalidades, setTodasLocalidades] = useState<LocalidadeProps[]>([]);

    // Carregar lista de localidades para o select
    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await api.get("/localidades");
                setTodasLocalidades(response.data);
            } catch (error) {
                toast.error("Erro ao carregar localidades.");
            }
        };

        if (isOpen) {
            fetchLocalidades();
        }
    }, [isOpen]);

    // Preencher campos ao abrir modal
    useEffect(() => {
        if (localidade) {
            setNome(localidade.nome);
            setLocalidadePai(localidade.localidade_pai);
        } else {
            setNome("");
            setLocalidadePai(null);
        }
    }, [localidade]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (localidade) {
                await api.put(`/localidades/${localidade.id_localidade}`, {
                    nome,
                    localidade_pai: localidadePai,
                });
                toast.success("Localidade atualizada com sucesso!");
            } else {
                await api.post("/localidades", {
                    nome,
                    localidade_pai: localidadePai,
                });
                toast.success("Localidade criada com sucesso!");
            }
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar localidade.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                    {localidade ? "Editar Localidade" : "Nova Localidade"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Nome */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    {/* Localidade Pai (Select) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Localidade Pai</label>
                        <select
                            value={localidadePai || ""}
                            onChange={(e) =>
                                setLocalidadePai(e.target.value ? Number(e.target.value) : null)
                            }
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Nenhuma</option>
                            {todasLocalidades.map((loc) => (
                                <option key={loc.id_localidade} value={loc.id_localidade}>
                                    {loc.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botões */}
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
