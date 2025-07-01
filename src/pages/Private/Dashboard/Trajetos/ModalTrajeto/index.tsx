import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";
import { EmpresaProps } from "../../Funcionarios/ModalFuncionario";

interface LocalidadeProps {
    id_localidade: number;
    nome: string;
}

interface TrajetoProps {
    id_empresa: number,
    id_partida: number;
    id_destino: number;
    lotacao: number;
    preco: number;
    percentual_parcela_inicial?: number;
}

type ModalTrajetoProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (novoTrajeto: TrajetoProps) => void;
};

export const ModalTrajeto: React.FC<ModalTrajetoProps> = ({ isOpen, onClose, onSave }) => {
    const [localidades, setLocalidades] = useState<LocalidadeProps[]>([]);
    const [idEmpresa, setIdEmpresa] = useState(0);
    const [empresas, setEmpresas] = useState<EmpresaProps[]>([]);
    const [novoTrajeto, setNovoTrajeto] = useState<TrajetoProps>({
        id_empresa: 0,
        id_partida: 0,
        id_destino: 0,
        lotacao: 0,
        preco: 0,
        percentual_parcela_inicial: 20.0,
    });

    // Buscar localidades ao abrir o modal
    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await api.get("/localidades");
                const responseEmpresas = await api.get("/empresas");

                setLocalidades(response.data);

                setEmpresas(responseEmpresas.data);
                console.log(responseEmpresas.data);

            } catch (error) {
                toast.error("Erro ao carregar localidades.");
            }
        };

        if (isOpen) fetchLocalidades();
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNovoTrajeto({ ...novoTrajeto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            novoTrajeto.id_empresa = idEmpresa;
            await onSave(novoTrajeto);
            onClose();
        } catch (error) {
            console.error("Erro ao salvar trajeto:", error);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-semibold mb-4">Criar Novo Trajeto</h2>
                    <div className="space-y-3">

                        <label className="block">
                            <span className="text-gray-700">Empresa</span>
                            <select
                                value={idEmpresa}
                                onChange={(e) => setIdEmpresa(Number(e.target.value))}
                                //onChange={handleChange}
                                className="w-full p-2 border rounded mt-1"
                            >
                                <option value={0} disabled>Selecione uma empresa</option>
                                {empresas.map((empresa) => (
                                    <option key={empresa.id_empresa} value={empresa.id_empresa}>
                                        {empresa.nome}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {/* Select para escolher a localidade de partida */}
                        <label className="block">
                            <span className="text-gray-700">Partida</span>
                            <select
                                name="id_partida"
                                value={novoTrajeto.id_partida}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mt-1"
                            >
                                <option value="">Selecione a partida</option>
                                {localidades.map((localidade) => (
                                    <option key={localidade.id_localidade} value={localidade.id_localidade}>
                                        {localidade.nome}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Select para escolher a localidade de destino */}
                        <label className="block">
                            <span className="text-gray-700">Destino</span>
                            <select
                                name="id_destino"
                                value={novoTrajeto.id_destino}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mt-1"
                            >
                                <option value="">Selecione o destino</option>
                                {localidades.map((localidade) => (
                                    <option key={localidade.id_localidade} value={localidade.id_localidade}>
                                        {localidade.nome}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Lotação</span>
                            <input
                                type="number"
                                name="lotacao"
                                value={novoTrajeto.lotacao}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mt-1"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Preço</span>
                            <input
                                type="number"
                                name="preco"
                                step="0.01"
                                value={novoTrajeto.preco}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mt-1"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Parcela Inicial (%)</span>
                            <input
                                type="number"
                                name="percentual_parcela_inicial"
                                step="0.01"
                                value={novoTrajeto.percentual_parcela_inicial}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mt-1"
                            />
                        </label>
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancelar
                        </button>
                        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ModalTrajeto;
