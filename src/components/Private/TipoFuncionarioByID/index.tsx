import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../services/apiClient";
import { ErrorResponse } from "../../../App";
import { TipoFuncionarioProps } from "../../../pages/Private/Dashboard/TiposFuncionarios";





export function TipoFuncionarioByID({ id_tipo_funcionario }: TipoFuncionarioProps) {
    const [tipoFuncionario, setTipoFuncionario] = useState<TipoFuncionarioProps | null>(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get("/tipos-funcionario/" + id_tipo_funcionario);
                console.log(response.data);
                setTipoFuncionario(response.data);
            } catch (error) {
                const err = error as ErrorResponse;
                if (err?.response?.data?.erro) {
                    toast.error(err.response.data.erro);
                }
                else {
                    toast.error("Falha na conexão de rede.");
                }
            }
        };
        fetchDados();
    }, [id_tipo_funcionario]);

    return (
        <div>
            {tipoFuncionario ?
                <p className="px-4 py-2">{tipoFuncionario.descricao}</p>
                :
                <p></p>
            }
        </div>
    )
}