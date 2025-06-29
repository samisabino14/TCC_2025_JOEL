import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../services/apiClient";
import { ErrorResponse } from "../../../App";


export type UsuarioProps = {
    id_pessoa: number;
    nome: string;
    localidade: number;
    bairro: string | null;
    rua: string | null;
    bilhete_identidade: string;
    email: string;
    telefone: string;
    genero: string;
    data_nascimento: string;
    id_usuario: number;
    tipo_usuario: string;
};


interface UsuarioByIDProps {
    id_usuario: number;
}

export function UsuarioByID({ id_usuario }: UsuarioByIDProps) {
    const [usuario, setUsuario] = useState<UsuarioProps | null>(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get("/usuarios/" + id_usuario);
                setUsuario(response.data);
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
    }, [id_usuario]);

    return (
        <div>
            {usuario ?
                <p className="px-4 py-2">{usuario.nome}</p>
                :
                <p></p>
            }
        </div>
    )
}