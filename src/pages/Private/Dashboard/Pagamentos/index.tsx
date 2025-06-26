import { useState, useEffect } from "react";
import { api } from "../../../../services/apiClient";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalPagamento } from "./ModalPagamento";

export type PagamentoProps = {
    id_pagamento: number;
    id_reserva: number;
    valor_pago: number;
    data_pagamento: string;
    metodo_pagamento: "cartao" | "transferencia" | "dinheiro";
    status_pagamento: "pendente" | "confirmado" | "cancelado";
};

export function Pagamentos() {
    const [pagamentos, setPagamentos] = useState<PagamentoProps[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [pagamentoEditando, setPagamentoEditando] = useState<PagamentoProps | null>(null);

    useEffect(() => {
        const fetchPagamentos = async () => {
            try {
                const response = await api.get("/pagamentos");
                setPagamentos(response.data);
            } catch (error) {
                toast.error("Erro ao buscar pagamentos.");
            }
        };
        fetchPagamentos();
    }, []);

    const handleSavePagamento = async (pagamento: Omit<PagamentoProps, "id_pagamento"> & { id_pagamento?: number }) => {
        try {
            if (pagamento.id_pagamento) {
                await api.put(`/pagamentos/${pagamento.id_pagamento}`, pagamento);
                setPagamentos((prev) => prev.map((p) => (p.id_pagamento === pagamento.id_pagamento ? { ...p, ...pagamento } : p)));
                toast.success("Pagamento atualizado com sucesso!");
            } else {
                const response = await api.post("/pagamentos", pagamento);
                setPagamentos([...pagamentos, response.data]);
                toast.success("Pagamento adicionado com sucesso!");
            }
            setModalAberto(false);
            setPagamentoEditando(null);
        } catch (error) {
            toast.error("Erro ao salvar pagamento.");
        }
    };

    const handleDelete = async (id_pagamento: number) => {
        try {
            await api.delete(`/pagamentos/${id_pagamento}`);
            setPagamentos(pagamentos.filter(p => p.id_pagamento !== id_pagamento));
            toast.success("Pagamento removido com sucesso!");
        } catch (error) {
            toast.error("Erro ao remover pagamento.");
        }
    };

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pagamentos</h2>
                <button
                    onClick={() => { setModalAberto(true); setPagamentoEditando(null); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
                >
                    <span>Adicionar Pagamento</span>
                </button>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2">Reserva</th>
                        <th className="px-4 py-2">Valor Pago</th>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Método</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentos.map((pagamento) => (
                        <tr key={pagamento.id_pagamento} className="border-t">
                            <td className="px-4 py-2">{pagamento.id_pagamento}</td>
                            <td className="px-4 py-2">{pagamento.id_reserva}</td>
                            <td className="px-4 py-2">{pagamento.valor_pago.toFixed(2)}</td>
                            <td className="px-4 py-2">{new Date(pagamento.data_pagamento).toLocaleString()}</td>
                            <td className="px-4 py-2 capitalize">{pagamento.metodo_pagamento}</td>
                            <td className="px-4 py-2 flex space-x-2">
                                <button onClick={() => { setPagamentoEditando(pagamento); setModalAberto(true); }} className="text-blue-500 hover:text-blue-700">
                                    <FaEdit className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDelete(pagamento.id_pagamento)} className="text-red-500 hover:text-red-700">
                                    <FaTrash className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {modalAberto && (
                <ModalPagamento
                    isOpen={modalAberto}
                    onClose={() => { setModalAberto(false); setPagamentoEditando(null); }}
                    onSave={handleSavePagamento}
                    pagamento={pagamentoEditando}
                />
            )}
        </div>
    );
}
