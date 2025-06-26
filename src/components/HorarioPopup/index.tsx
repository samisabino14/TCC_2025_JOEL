import { AiOutlineClose } from "react-icons/ai";
import { HorarioProps } from "../SearchCard";
import { returnHour } from "../../utils/functions/returnHour";
import { returnDate } from "../../utils/functions/returnDate";

interface HorarioPopupProps {
    horarios: HorarioProps[];
    onClose: () => void;
    handleHorarioSelecionado: (horario: number) => void
}

export function HorarioPopup({ horarios, handleHorarioSelecionado, onClose }: HorarioPopupProps) {

    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40vw]">

                <div className="flex justify-between pb-10">
                    <h2 className="text-lg font-semibold">Horários Disponíveis</h2>
                    <button
                        className="cursor-pointer p-2 bg-red-400 hover:bg-red-500 rounded-full transition duration-200"
                        onClick={onClose}
                    >
                        <AiOutlineClose className="w-4 h-4 text-white" />
                    </button>
                </div>
                <div className="max-h-48 overflow-y-auto">
                    {horarios.length > 0 ? (
                        <ul className="grid xl:grid-cols-2 gap-3">
                            {horarios.map((horario, index) => (
                                <li
                                    key={index}
                                    className="p-3 border hover:bg-gray-100 cursor-pointer rounded-md text-center shadow-md"
                                    onClick={() => handleHorarioSelecionado(horario.id_horario)}
                                >
                                    {/*returnDate((horario.data_hora))*/} 
                                    <p className="font-semibold">{returnHour(horario.data_hora)}</p>
                                    <p>{horario.nome} ({horario.endereco})</p>
                                    <p>{Number(horario.preco).toFixed(0)} Kzs</p>
                                    <p>Lugares: {horario.lugares_disponiveis}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Nenhum horário disponível.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
