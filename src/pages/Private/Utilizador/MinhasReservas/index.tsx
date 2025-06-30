import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../../services/apiClient";
import { ErrorResponse } from "../../../../App";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthContext";
import { TrajetoByID } from "../../../../components/Private/TrajetoByID";

type ReservaProps = {
    id_reserva: number;
    id_trajeto: number;
    partida_trajeto: string;
    destino_trajeto: string;
    status_reserva: string;
    criacao: string;
    atualizacao: string;
}

export function MinhasReservas() {

    const { user } = useContext(AuthContext);

    const [reservas, setReservas] = useState<ReservaProps[]>([]);

    useEffect(() => {
        const fetchDados = async () => {

            if (!user) {
                return;
            }

            try {
                const response = await api.get(`/reservas/usuario/${user.id_usuario}`);

                setReservas(response.data)

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
    }, [user])

    return (

        <div className="flex flex-col p-10">
            <div className="flex justify-between">

                <h1 className="text-xl text-gray-600 font-semibold">Minhas reservas</h1>

                <Link to={'/'} className='bg-gradient-to-r font-semibold duration-500 cursor-pointer from-green-400 to-green-600 py-3 px-8 rounded-lg text-white text-sm'>
                    <p>Fazer reserva</p>
                </Link>

            </div>
            <div className="overflow-x-auto pt-10">
                {reservas?.length > 0 ? (
                    <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Trajeto</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Criação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva, index) => (
                                <tr
                                    key={reserva.id_reserva}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        } hover:bg-gray-200 transition`}
                                >
                                    <td className="px-4 py-2 border">{reserva.id_reserva}</td>
                                    <td className="font-semibold py-2 border"> <TrajetoByID id_trajeto={reserva.id_trajeto} /></td>
                                    {/*
                                    <td className="px-4 py-2 border">{reserva.usuario}</td>
                                    <td className="px-4 py-2 border">{reserva.partida_trajeto}</td>
                                    <td className="px-4 py-2 border">{reserva.destino_trajeto}</td>
                                     */}

                                    <td
                                        className={`px-4 py-2 border font-semibold 
                                            ${reserva.status_reserva.toLocaleLowerCase() === "confirmada"
                                                ? "text-green-600"
                                                : reserva.status_reserva.toLocaleLowerCase() === "pendente" ? "text-orange-400" : "text-red-600"
                                            }
                                        `}
                                    >
                                        {reserva.status_reserva}
                                    </td>
                                    <td className="px-4 py-2 border text-gray-500">
                                        {new Date(reserva.criacao).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 mt-4">
                        Nenhuma reserva encontrada.
                    </p>
                )}
            </div>

        </div>
    )
}