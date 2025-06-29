import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FuncionarioProps } from "..";
import { api } from "../../../../../services/apiClient";
import { ErrorResponse } from "../../../../../App";

type TipoFuncionario = {
    id: number;
    descricao: string;
};

export type EmpresaProps = {
    id_empresa: number;
    nome: string;
    nif: string;
    email: string;
    localidade: string;
    telefone: string;
    endereco: string;
    criacao: string;
    atualizacao: string;
};

export function ModalFuncionario({ isOpen, onClose, funcionario }: { isOpen: boolean; onClose: () => void; funcionario: FuncionarioProps | null; }) {

    const [tiposFuncionarios, setTiposFuncionarios] = useState<TipoFuncionario[]>([]);
    const [empresas, setEmpresas] = useState<EmpresaProps[]>([]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [idTipoFuncionario, setIdTipoFuncionario] = useState<number | null>(0);
    const [idEmpresa, setIdEmpresa] = useState(0);


    useEffect(() => {
        if (funcionario) {
            setIdUsuario(funcionario.id_usuario);
            setIdTipoFuncionario(funcionario.id_tipo_funcionario);
        } else {
            setIdUsuario(0);
            setIdTipoFuncionario(0);
            setIdEmpresa(0)
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

    useEffect(() => {
        const carregarEmpresas = async () => {
            try {
                const response = await api.get("/empresas");
                setEmpresas(response.data);
            } catch (error) {
                const err = error as ErrorResponse;

                if (err?.response?.data) {
                    toast.error(err.response.data.mensagem);
                }
                else if (err?.response?.data?.statusCode) {
                    toast.error(err.response.data.mensagem);
                }
                else
                    toast.error("Falha na conexão de rede.");
            }
        };
        carregarEmpresas();
    }, []);

    const handleSave = async () => {
        try {
            if (idUsuario === 0 || !idTipoFuncionario) {
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
                    id_empresa: idEmpresa
                });

                toast.success("Funcionário criado com sucesso!");
            }
            onClose();
        } catch (error) {
            const err = error as ErrorResponse;

            if (err?.response?.data) {
                toast.error(err.response.data.mensagem);
            }
            else if (err?.response?.data?.statusCode) {
                toast.error(err.response.data.mensagem);
            }
            else
                toast.error("Falha na conexão de rede.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{funcionario ? "Editar Funcionário" : "Novo Funcionário"}</h2>
                <label className="block mb-2">Usuário</label>
                <input
                    type="text"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                />

                <label className="block mb-2">Tipo de Funcionário</label>
                <select
                    //value={idTipoFuncionario}
                    onChange={(e) => {
                        const id = Number(e.target.value);
                        setIdTipoFuncionario(id);
                    }}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value={0} disabled>Selecione um tipo de funcionário</option>
                    {tiposFuncionarios.map((tipoFuncionario) => (
                        <option key={tipoFuncionario.id} value={tipoFuncionario.id}>
                            {tipoFuncionario.descricao}
                        </option>
                    ))}
                </select>

                <label className="block mb-2">Empresa</label>

                <select
                    value={idEmpresa}
                    onChange={(e) => setIdEmpresa(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value={0} disabled>Selecione uma empresa</option>
                    {empresas.map((empresa) => (
                        <option key={empresa.id_empresa} value={empresa.id_empresa}>
                            {empresa.nome}
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
