import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../services/apiClient";
import { ErrorResponse } from "../../../App";

export type TrajetoProps = {
    id_trajeto: number;
    id_partida: number;
    partida: string;
    destino: string;
    id_destino: number;
    lotacao: number;
    preco: number;
    percentual_parcela_inicial: number;
    criacao: string;
};

interface TrajetoByIDProps {
    id_trajeto: number;
}

export function TrajetoByID({ id_trajeto }: TrajetoByIDProps) {

    const [trajeto, setTrajeto] = useState<TrajetoProps | null>(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get("/trajetos/" + id_trajeto);
                setTrajeto(response.data);
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
    }, []);

    return (
        <div>
            {trajeto ?
                <p className="px-4 py-2">{trajeto.partida} → {trajeto.destino}</p>
                :
                <p></p>
            }
        </div>
    )
}