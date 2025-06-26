import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCircle, FaSave } from "react-icons/fa";

export function ModalPagamento({ isOpen, onClose, onSave, pagamento }) {
    const [dados, setDados] = useState({
        id_reserva: "",
        valor_pago: "",
        metodo_pagamento: "cartao",
        status_pagamento: "pendente",
    });

    useEffect(() => {
        if (pagamento) {
            setDados(pagamento);
        }
    }, [pagamento]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!dados.id_reserva || !dados.valor_pago) {
            toast.error("Preencha todos os campos obrigatórios!");
            return;
        }

        try {
            await onSave(dados);
            toast.success("Pagamento salvo com sucesso!");
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar pagamento.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{pagamento ? "Editar" : "Novo"} Pagamento</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaCircle size={24} />
                    </button>
                </div>
                <div className="space-y-3">
                    <label className="block">
                        <span className="text-gray-700">ID da Reserva</span>
                        <input
                            type="number"
                            name="id_reserva"
                            value={dados.id_reserva}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Valor Pago</span>
                        <input
                            type="number"
                            name="valor_pago"
                            value={dados.valor_pago}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Forma de Pagamento</span>
                        <select
                            name="metodo_pagamento"
                            value={dados.metodo_pagamento}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="cartao">Cartão</option>
                            <option value="transferencia">Transferência</option>
                            <option value="dinheiro">Dinheiro</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Status</span>
                        <select
                            name="status_pagamento"
                            value={dados.status_pagamento}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="pendente">Pendente</option>
                            <option value="pago">Confirmado</option>
                        </select>
                    </label>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                        <FaSave size={16} className="mr-2" /> Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
