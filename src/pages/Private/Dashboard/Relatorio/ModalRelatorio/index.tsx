import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";



export function ModalRelatorio({ isOpen, onClose, onSave, relatorio }) {
    const [formData, setFormData] = useState({
        tipo_relatorio: "",
        id_funcionario: "",
        data_inicio: "",
        data_fim: ""
    });

    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        if (relatorio) {
            setFormData({
                tipo_relatorio: relatorio.tipo_relatorio || "",
                id_funcionario: relatorio.id_funcionario || "",
                data_inicio: relatorio.data_inicio || "",
                data_fim: relatorio.data_fim || ""
            });
        } else {
            setFormData({
                tipo_relatorio: "",
                id_funcionario: "",
                data_inicio: "",
                data_fim: ""
            });
        }
    }, [relatorio]);

    useEffect(() => {
        async function fetchFuncionarios() {
            try {
                const response = await api.get("/funcionarios");
                setFuncionarios(response.data);
            } catch (error) {
                toast.error("Erro ao carregar funcionários.");
            }
        }
        fetchFuncionarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.tipo_relatorio || !formData.id_funcionario || !formData.data_inicio || !formData.data_fim) {
            toast.error("Preencha todos os campos!");
            return;
        }
        try {
            await onSave(formData);
            toast.success("Relatório salvo com sucesso!");
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar relatório.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{relatorio ? "Editar Relatório" : "Novo Relatório"}</h2>
                    <button onClick={onSave} className="text-gray-500 hover:text-red-600">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="mt-4 space-y-3">
                    <label className="block">
                        <span className="text-gray-700">Tipo de Relatório</span>
                        <input
                            type="text"
                            name="tipo_relatorio"
                            value={formData.tipo_relatorio}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Funcionário</span>
                        <select
                            name="id_funcionario"
                            value={formData.id_funcionario}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Selecione um funcionário</option>
                            {funcionarios.map((func) => (
                                <option key={func.id_funcionario} value={func.id_funcionario}>
                                    {func.nome}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Data de Início</span>
                        <input
                            type="datetime-local"
                            name="data_inicio"
                            value={formData.data_inicio}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Data Fim</span>
                        <input
                            type="datetime-local"
                            name="data_fim"
                            value={formData.data_fim}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </label>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
