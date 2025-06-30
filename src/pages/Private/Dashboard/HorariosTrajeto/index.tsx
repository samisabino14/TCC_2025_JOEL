import { useState, useEffect } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { ModalHorarioTrajeto } from "./ModalHorarioTrajeto";
import { ErrorResponse } from "../../../../App";

export type HorarioTrajetoProps = {
    id_horario: number;
    id_trajeto: number;
    partida: string;
    destino: string;
    data_hora: string;
    lugares_disponiveis: number;
};

export function HorariosTrajeto() {
    const [horarios, setHorarios] = useState<HorarioTrajetoProps[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [horarioParaEditar, setHorarioParaEditar] = useState<HorarioTrajetoProps | null>(null);

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await api.get("/horarios-trajeto");
                console.log(response.data);
                setHorarios(response.data);
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
        fetchHorarios();
    }, []);

    const handleSaveHorario = async (novoHorario: Omit<HorarioTrajetoProps, "id_horario">) => {
        try {
            if (horarioParaEditar) {
                await api.put(`/horarios-trajeto/${horarioParaEditar.id_horario}`, novoHorario);
                setHorarios((prev) =>
                    prev.map((horario) =>
                        horario.id_horario === horarioParaEditar.id_horario ? { ...horario, ...novoHorario } : horario
                    )
                );
                toast.success("Horário atualizado com sucesso!");
            } else {
                toast(novoHorario.id_trajeto)
                /*
                const response = await api.post("/horarios-trajeto", novoHorario);
                setHorarios([...horarios, response.data]);
                */
                toast.success("Horário adicionado com sucesso!");
            }
            setModalAberto(false);
            setHorarioParaEditar(null);
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

    const handleDeleteHorario = async (id_horario: number) => {
        try {
            await api.delete(`/horarios-trajeto/${id_horario}`);
            setHorarios(horarios.filter((horario) => horario.id_horario !== id_horario));
            toast.success("Horário removido com sucesso!");
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

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Horários de Trajeto</h1>
            <button
                onClick={() => {
                    setHorarioParaEditar(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Adicionar Novo Horário
            </button>

            <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Trajeto</th>
                        <th className="px-4 py-2">Data e Hora</th>
                        <th className="px-4 py-2">Lugares Disponíveis</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map((horario) => (
                        <tr key={horario.id_horario} className="border-t">
                            <td className="px-4 py-2">{horario.id_horario}</td>
                            <td className="px-4 py-2">{horario.partida} → {horario.destino}</td>
                            <td className="px-4 py-2">{new Date(horario.data_hora).toLocaleString()}</td>
                            <td className="px-4 py-2">{horario.lugares_disponiveis}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => {
                                        setHorarioParaEditar(horario);
                                        setModalAberto(true);
                                    }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteHorario(horario.id_horario)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto && (
                <ModalHorarioTrajeto
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    onSave={handleSaveHorario}
                    horarioParaEditar={horarioParaEditar}
                />
            )}
        </div>
    );
}
