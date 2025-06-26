import { useEffect, useState } from "react";
import { SuporteProps } from "..";

import { toast } from "react-hot-toast";
import { api } from "../../../../../services/apiClient";

interface ModalSuporteProps {
    isOpen: boolean;
    onClose: () => void;
    suporteSelecionado: SuporteProps | null;
}

export function ModalSuporte({ suporteSelecionado, onClose }: ModalSuporteProps) {
    const [idUsuario, setIdUsuario] = useState(0);
    const [idFuncionario, setIdFuncionario] = useState<number | null>(null);
    const [idTipoSuporte, setIdTipoSuporte] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("pendente");
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [tiposSuporte, setTiposSuporte] = useState<any[]>([]);

    useEffect(() => {
        carregarUsuarios();
        carregarTiposSuporte();
        if (suporteSelecionado) {
            setIdUsuario(suporteSelecionado.id_usuario);
            setIdFuncionario(suporteSelecionado.id_funcionario ?? null);
            setIdTipoSuporte(suporteSelecionado.id_tipo_suporte);
            setDescricao(suporteSelecionado.descricao);
            setStatus(suporteSelecionado.status);
        } else {
            resetForm();
        }
    }, [suporteSelecionado]);

    const carregarUsuarios = async () => {
        try {
            const response = await api.get("/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            toast.error("Erro ao carregar usuários");
        }
    };

    const carregarTiposSuporte = async () => {
        try {
            const response = await api.get("/tipos_suporte");
            setTiposSuporte(response.data);
        } catch (error) {
            toast.error("Erro ao carregar tipos de suporte");
        }
    };

    const resetForm = () => {
        setIdUsuario(0);
        setIdFuncionario(null);
        setIdTipoSuporte(0);
        setDescricao("");
        setStatus("pendente");
    };

    const handleSalvar = async () => {
        const chamado = {
            id_usuario: idUsuario,
            id_funcionario: suporteSelecionado?.id_funcionario || null,
            id_tipo_suporte: idTipoSuporte,
            descricao,
            status,
        };

        try {
            if (suporteSelecionado) {
                await api.put(`/suporte_tecnico/${suporteSelecionado.id_suporte}`, chamado);
                toast.success("Chamado atualizado com sucesso!");
            } else {
                await api.post("/suporte_tecnico", chamado);
                toast.success("Chamado criado com sucesso!");
            }
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar chamado.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">{suporteSelecionado ? "Editar Suporte" : "Novo Suporte"}</h2>
                <label className="block mb-2">Usuário</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(Number(e.target.value))}
                >
                    <option value={0}>Selecione um usuário</option>
                    {usuarios.map(user => (
                        <option key={user.id_usuario} value={user.id_usuario}>{user.nome}</option>
                    ))}
                </select>
                <label className="block mb-2">Tipo de Suporte</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={idTipoSuporte}
                    onChange={(e) => setIdTipoSuporte(Number(e.target.value))}
                >
                    {tiposSuporte.map(tipo => (
                        <option key={tipo.id_tipo_suporte} value={tipo.id_tipo_suporte}>{tipo.descricao}</option>
                    ))}
                </select>
                <label className="block mb-2">Descrição</label>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <label className="block mb-2">Status</label>
                <select
                    className="w-full p-2 border rounded mb-4"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "pendente" | "em andamento" | "resolvido" | "cancelado")}
                >
                    <option value="pendente">Pendente</option>
                    <option value="em andamento">Em andamento</option>
                    <option value="resolvido">Resolvido</option>
                    <option value="cancelado">Cancelado</option>
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button onClick={handleSalvar} className="bg-blue-600 text-white px-4 py-2 rounded">
                        {suporteSelecionado ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    )
}
