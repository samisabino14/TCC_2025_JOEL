import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Loading from "../../../../../components/Loading";
import { api } from "../../../../../services/apiClient";
import { TrajetoProps } from "../..";
import { ErrorResponse } from "../../../../../App";
import toast from "react-hot-toast";
import { FaArrowCircleRight } from "react-icons/fa";

function formatarNumero(valor: number) {
    return Number(valor).toLocaleString("fr-FR").replace(",", " ");
}

const returnDate = (date: string) => {

    return `${new Date(date).getDate().toString().padStart(2, "0")}-${(new Date(date).getMonth() + 1).toString().padStart(2, "0")}-${new Date(date).getFullYear().toString().padStart(2, "0")}`;
}


export function Nova() {
    const { user } = useContext(AuthContext);
    const { id_trajeto, date, horarioSelecionado } = useParams();
    const [trajeto, setTrajeto] = useState<TrajetoProps | null>(null);

    useEffect(() => {
        const fetchDados = async () => {

            if (!id_trajeto || Number(id_trajeto) === 0) {
                return;
            }

            try {
                const response = await api.get(`/trajetos/${id_trajeto}`);

                setTrajeto(response.data)
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

        fetchDados();
    })

    // Exibe um carregador se `user` for nulo
    if (!user) {
        return (
            <div className="flex w-64 items-center justify-center h-screen">
                <Loading size={5} />
            </div>
        );
    }

    return (
        <div className="flex flex-col p-10 w-full">
            <div className="flex flex-col justify-center items-center gap-20">

                <h1 className="font-bold text-xl text-center">Nova Reserva</h1>

                {trajeto && date && horarioSelecionado ?

                    <div className="flex flex-col justify-center items-center gap-6 shadow-lg rounded-lg w-[50%] p-10">
                        <div className="font-bold text-2xl flex items-center gap-4">
                            <p className="text-[#F2994A]">{trajeto?.partida}</p>
                            <FaArrowCircleRight size={18} />
                            <p className="text-green-500">{trajeto?.destino}</p>
                        </div>

                        <div>
                            <p>{returnDate(date)} às {horarioSelecionado} </p>
                        </div>

                        <div className="text-sx grid text-center gap-6">
                            <p><span className="font-bold text-4xl">{formatarNumero(Number(trajeto?.preco))} Kzs</span></p>
                            <div className="text-sx grid text-center gap-1">

                                <p>Percentual parcela inicial: <span className="font-semibold">{Number(trajeto?.percentual_parcela_inicial).toFixed(0)}%</span></p>
                                <p>Parcela inicial: <span className="font-semibold">{formatarNumero((Number(trajeto?.preco) * Number(trajeto?.percentual_parcela_inicial)) / 100)} Kzs</span></p>

                            </div>
                        </div>

                        <div onClick={() => alert("OK")} className='bg-gradient-to-r w-[50%] font-semibold duration-500 cursor-pointer from-[#F2994A] to-[#FFCA28] py-3 px-4 text-center rounded-lg text-white text-sm'>
                            <p>Reservar</p>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center gap-6 shadow-lg rounded-lg w-[50%] p-10">
                        <p>Este trajeto não foi encontrado.</p>
                    </div>
                }

            </div>
        </div>
    )
}