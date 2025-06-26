import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { api } from "../../../../services/apiClient";
import { ModalBonus } from "./ModalBonus";

export type BonusProps = {
    id_bonus: number;
    id_usuario: number;
    usuario: string;
    id_funcionario: number;
    id_trajeto: number;
    funcionario: string;
    descricao: string;
    valor_bonus: number;
    data_inicio: string;
    data_fim: string;
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
            setBonus(response.data);
        } catch (error) {
            toast.error("Falha ao carregar os bônus.");
        }
    };

    const handleEdit = (id: number) => {
        const bonusSelecionado = bonus.find((b) => b.id_bonus === id);
        if (bonusSelecionado) {
            setBonusSelecionado(bonusSelecionado);
            setModalAberto(true);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este bônus?")) {
            try {
                await api.delete(`/bonus/${id}`);
                setBonus(bonus.filter((b) => b.id_bonus !== id));
                toast.success("Bônus excluído com sucesso!");
            } catch (error) {
                toast.error("Erro ao excluir o bônus.");
            }
        }
    };

    return (
        <div className="p-4 w-full max-h-screen overflow-auto">
            <h2 className="text-xl font-bold mb-4">Bônus</h2>
            <button
                onClick={() => {
                    setBonusSelecionado(null);
                    setModalAberto(true);
                }}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Novo Bônus
            </button>
            <div className="max-h-[500px] overflow-y-auto rounded-lg shadow-md border border-gray-300">
                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border text-left">ID</th>
                            <th className="px-6 py-3 border text-left">Usuário</th>
                            <th className="px-6 py-3 border text-left">Funcionário</th>
                            <th className="px-6 py-3 border text-left">Descrição</th>
                            <th className="px-6 py-3 border text-left">Valor</th>
                            <th className="px-6 py-3 border text-left">Início</th>
                            <th className="px-6 py-3 border text-left">Fim</th>
                            <th className="px-6 py-3 border text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bonus.length > 0 ? (
                            bonus.map((b, index) => (
                                <tr key={b.id_bonus} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                                    <td className="px-6 py-3 border">{b.id_bonus}</td>
                                    <td className="px-6 py-3 border font-semibold">{b.usuario}</td>
                                    <td className="px-6 py-3 border">{b.id_funcionario}</td>
                                    <td className="px-6 py-3 border">{b.descricao}</td>
                                    <td className="px-6 py-3 border">R$ {b.valor_bonus}</td>
                                    <td className="px-6 py-3 border">{new Date(b.data_inicio).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 border">{new Date(b.data_fim).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 border flex space-x-2">
                                        <button onClick={() => handleEdit(b.id_bonus)} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(b.id_bonus)} className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-gray-500 py-4 text-center">
                                    Nenhum bônus encontrado.
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
                    bonus={bonusSelecionado}
                />
            )}
        </div>
    );
}
