import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { api } from "../../../../services/apiClient";
import { ModalBonus } from "./ModalBonus";
import { ErrorResponse } from "../../../../App";

export type BonusProps = {
    id_bonus: number;
    id_usuario: number;
    usuario: string;
    id_funcionario: number;
    funcionario: string;
    id_trajeto: number;
    trajeto: string;
    descricao: string;
    valor_bonus: number;
    data_inicio: string;
    data_fim: string;
    estado: string;
};

export function Bonus() {
    const [bonus, setBonus] = useState<BonusProps[]>([]);
    const [bonusSelecionado, setBonusSelecionado] = useState<BonusProps | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        carregarBonus();
    }, []);

    const carregarBonus = async () => {
        try {
            const response = await api.get("/bonus");
            console.log(response.data);
            setBonus(response.data);
        } catch (error) {
            const err = error as ErrorResponse;
            toast.error(err?.response?.data?.mensagem || "Falha na conexão de rede.");
        }
    };

    const handleEdit = (id: number) => {
        const b = bonus.find((x) => x.id_bonus === id);
        if (b) {
            setBonusSelecionado(b);
            setModalAberto(true);
        }
    };

    const toast = async (id: number) => {
        if (window.confirm("Deseja realmente excluir este bônus?")) {
            try {
                await api.delete(`/bonus/${id}`);
                setBonus((prev) => prev.filter((x) => x.id_bonus !== id));
                toast.success("Bônus excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir bônus.");
            }
        }
    };

    return (
        <div className="p-4 w-full">

            <h1 className="text-xl font-bold mb-4">Bônus</h1>

            <button
                onClick={() => {
                    setBonusSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Novo Bônus
            </button>
            <div className="overflow-x-auto">
                <table className="w-full bg-white border rounded shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Usuário</th>
                            <th className="px-4 py-2 border">Trajeto</th>
                            <th className="px-4 py-2 border">Descrição</th>
                            <th className="px-4 py-2 border">Valor</th>
                            <th className="px-4 py-2 border">Início</th>
                            <th className="px-4 py-2 border">Fim</th>
                            <th className="px-4 py-2 border">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bonus.length > 0 ? (
                            bonus.map((b) => (
                                <tr key={b.id_bonus} className="hover:bg-gray-100">

                                    <td className="border px-4 py-2">{b.id_bonus}</td>
                                    <td className="border px-4 py-2">{b.id_usuario}</td>
                                    <td className="border px-4 py-2">{b.id_trajeto}</td>
                                    <td className="border px-4 py-2">{b.descricao}</td>
                                    <td className="border px-4 py-2">Kz {b.valor_bonus}</td>
                                    <td className="border px-4 py-2">{new Date(b.data_inicio).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{new Date(b.data_fim).toLocaleDateString()}</td>
                                    <td className={`border px-4 py-2 capitalize font-semibold text-xs ${b.estado.toLocaleLowerCase() === "usado"
                                        ? "text-green-600"
                                        : b.estado.toLocaleLowerCase() === "pendente" ? "text-orange-400" : "text-red-600"
                                        } `}>{b.estado}
                                    </td>
                                    {/**
                                     *<td className="border px-4 py-2 text-center space-x-2">
                                        <button onClick={() => handleEdit(b.id_bonus)} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => toast(b.id_bonus)} className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                     */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="text-center py-4 text-gray-500">
                                    Nenhum bônus registrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalAberto && (
                <ModalBonus
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    bonusSelecionado={bonusSelecionado}
                />
            )}
        </div>
    );
}
