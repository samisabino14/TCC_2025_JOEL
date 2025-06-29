import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalReserva } from "./ModalReserva";
import { TrajetoByID } from "../../../../components/Private/TrajetoByID";
import { UsuarioByID } from "../../../../components/Private/UsuarioByID";
import { ErrorResponse } from "../../../../App";

export type ReservaProps = {
    id_reserva: number;
    id_usuario: number;
    usuario: string;
    id_trajeto: number;
    id_funcionario: number;
    partida_trajeto: string;
    destino_trajeto: string;
    status_reserva: string;
    criacao: string;
    atualizacao: string;
};

export function Reservas() {
    const [reservas, setReservas] = useState<ReservaProps[]>([]);
    const [reservaSelecionada, setReservaSelecionada] = useState<ReservaProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const response = await api.get(`/reservas`);
                setReservas(response.data);
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

    const handleEdit = (id: number) => {
        const reserva = reservas.find((r) => r.id_reserva === id);
        if (reserva) {
            setReservaSelecionada(reserva);
            setModalAberto(true);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
            try {
                await api.delete(`/reservas/${id}`);
                setReservas(reservas.filter((reserva) => reserva.id_reserva !== id));
                toast.success("Reserva excluída com sucesso!");
            } catch (error) {
                const err = error as ErrorResponse;
                if (err?.response?.data?.erro) {
                    toast.error(err.response.data.erro);
                }
                else {
                    toast.error("Falha na conexão de rede.");
                }
            }
        }
    };

    return (
        <div className="w-full p-4 max-h-full">
            <h1 className="text-xl font-bold mb-4">Reservas</h1>
            <button
                onClick={() => {
                    setReservaSelecionada(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Nova Reserva
            </button>
            <div className="w-full overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto rounded-lg shadow-md border border-gray-300">
                    <table className="w-full bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-700 text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Usuário</th>
                                <th className="px-6 py-3 text-left">Trajeto</th>
                                <th className="px-6 py-3 text-left">Aceite por</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Criação</th>
                                <th className="px-6 py-3 text-left">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.length > 0 ? (
                                reservas.map((reserva, index) => (
                                    <tr
                                        key={reserva.id_reserva}
                                        className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                    >
                                        <td className="px-6 py-3 border">{reserva.id_reserva}</td>
                                        <td className="font-semibold py-2 border"> <UsuarioByID id_usuario={reserva.id_usuario} /></td>
                                        <td className="font-semibold py-2 border"> <TrajetoByID id_trajeto={reserva.id_trajeto} /></td>
                                        <td className="px-6 py-3 border">{reserva.id_funcionario}</td>
                                        <td className={`px-6 py-3 border font-semibold ${reserva.status_reserva.toLowerCase() === "confirmada" ? "text-green-600" : reserva.status_reserva.toLowerCase() === "pendente" ? "text-orange-400" : "text-red-600"}`}>{reserva.status_reserva}</td>
                                        <td className="px-6 py-3 border text-gray-500">{new Date(reserva.criacao).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 border flex gap-2">
                                            <button onClick={() => handleEdit(reserva.id_reserva)} className="text-blue-600 hover:text-blue-800">
                                                <FaEdit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(reserva.id_reserva)} className="text-red-600 hover:text-red-800">
                                                <FaTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">Nenhuma reserva encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {modalAberto && (
                <ModalReserva
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    reserva={reservaSelecionada}
                />
            )}
        </div>
    );
}
