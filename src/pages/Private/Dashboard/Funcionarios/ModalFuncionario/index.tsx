import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FuncionarioProps } from "..";
import { api } from "../../../../../services/apiClient";

type TipoFuncionario = {
    id_tipo_funcionario: number;
    descricao: string;
};

export function ModalFuncionario({ isOpen, onClose, funcionario }: { isOpen: boolean; onClose: () => void; funcionario: FuncionarioProps | null; }) {
    const [idUsuario, setIdUsuario] = useState(0);
    const [idTipoFuncionario, setIdTipoFuncionario] = useState(0);
    const [tiposFuncionarios, setTiposFuncionarios] = useState<TipoFuncionario[]>([]);

    useEffect(() => {
        if (funcionario) {
            setIdUsuario(funcionario.id_usuario);
            setIdTipoFuncionario(funcionario.id_tipo_funcionario);
        } else {
            setIdUsuario(0);
            setIdTipoFuncionario(0);
        }
    }, [funcionario]);

    useEffect(() => {
        const carregarTiposFuncionarios = async () => {
            try {
                const response = await api.get("/tipos-funcionario");
                setTiposFuncionarios(response.data);
            } catch (error) {
                toast.error("Erro ao carregar tipos de funcionário.");
            }
        };
        carregarTiposFuncionarios();
    }, []);

    const handleSave = async () => {
        try {
            if (idUsuario === 0 || idTipoFuncionario === 0) {
                toast.error("Por favor, preencha todos os campos.");
                return;
            }

            if (funcionario) {
                await api.put(`/funcionarios/${funcionario.id_funcionario}`, {
                    id_usuario: idUsuario,
                    id_tipo_funcionario: idTipoFuncionario,
                });
                toast.success("Funcionário atualizado com sucesso!");
            } else {
                await api.post("/funcionarios", {
                    id_usuario: idUsuario,
                    id_tipo_funcionario: idTipoFuncionario,
                });
                toast.success("Funcionário criado com sucesso!");
            }
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar funcionário.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{funcionario ? "Editar Funcionário" : "Novo Funcionário"}</h2>
                <label className="block mb-2">Usuário</label>
                <input
                    type="number"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                />
                <label className="block mb-2">Tipo de Funcionário</label>
                <select
                    value={idTipoFuncionario}
                    onChange={(e) => setIdTipoFuncionario(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value={0} disabled>Selecione um tipo de funcionário</option>
                    {tiposFuncionarios.map((tipo) => (
                        <option key={tipo.id_tipo_funcionario} value={tipo.id_tipo_funcionario}>
                            {tipo.descricao}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
                </div>
            </div>
        </div>
    );
}
