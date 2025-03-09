import { useState, useEffect } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { ModalHorarioTrajeto } from "./ModalHorarioTrajeto";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await api.get("/horarios-trajeto");
                setHorarios(response.data);
            } catch (error) {
                toast.error("Erro ao buscar horários de trajeto.");
            }
        };
        fetchHorarios();
    }, []);

    const handleSaveHorario = async (novoHorario: Omit<HorarioTrajetoProps, "id_horario">) => {
        try {
            const response = await api.post("/horarios-trajeto", novoHorario);
            setHorarios([...horarios, response.data]);
            toast.success("Horário adicionado com sucesso!");

            navigate(0); // Isso recarrega a página
        } catch (error) {
            toast.error("Erro ao adicionar horário.");
        }
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">Horários de Trajeto</h1>
            <button
                onClick={() => setModalAberto(true)}
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
                    </tr>
                </thead>
                <tbody>
                    {horarios.map((horario) => (
                        <tr key={horario.id_horario} className="border-t">
                            <td className="px-4 py-2">{horario.id_horario}</td>
                            <td className="px-4 py-2">{horario.partida} → {horario.destino}</td>
                            <td className="px-4 py-2">{new Date(horario.data_hora).toLocaleString()}</td>
                            <td className="px-4 py-2">{horario.lugares_disponiveis}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto && (
                <ModalHorarioTrajeto isOpen={modalAberto} onClose={() => setModalAberto(false)} onSave={handleSaveHorario} />
            )}
        </div>
    );
}
