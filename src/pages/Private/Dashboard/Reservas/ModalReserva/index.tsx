import { useState, useEffect } from "react";
import { ReservaProps } from "..";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";

interface ModalReservaProps {
    isOpen: boolean;
    onClose: () => void;
    reserva?: ReservaProps | null;
}

export function ModalReserva({ isOpen, onClose, reserva }: ModalReservaProps) {
    const [usuario, setUsuario] = useState("");
    const [partida, setPartida] = useState("");
    const [destino, setDestino] = useState("");
    const [status, setStatus] = useState("Pendente");

    useEffect(() => {
        if (reserva) {
            setUsuario(reserva.usuario);
            setPartida(reserva.partida_trajeto);
            setDestino(reserva.destino_trajeto);
            setStatus(reserva.status_reserva);
        } else {
            setUsuario("");
            setPartida("");
            setDestino("");
            setStatus("Pendente");
        }
    }, [reserva]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (reserva) {
                await api.put(`/reservas/${reserva.id_reserva}`, {
                    usuario,
                    partida_trajeto: partida,
                    destino_trajeto: destino,
                    status_reserva: status,
                });
                toast.success("Reserva atualizada com sucesso!");
            } else {
                await api.post(`/reservas`, {
                    usuario,
                    partida_trajeto: partida,
                    destino_trajeto: destino,
                    status_reserva: status,
                });
                toast.success("Reserva criada com sucesso!");
            }
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar a reserva.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {reserva ? "Editar Reserva" : "Nova Reserva"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Partida"
                        value={partida}
                        onChange={(e) => setPartida(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Destino"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
