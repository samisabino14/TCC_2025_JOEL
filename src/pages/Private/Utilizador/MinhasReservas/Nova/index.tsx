import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../../components/Loading";
import { api } from "../../../../../services/apiClient";
import { TrajetoProps } from "../..";
import { ErrorResponse } from "../../../../../App";
import toast from "react-hot-toast";
import { FaArrowCircleRight } from "react-icons/fa";
import { Popup } from "../../../../../components/Popup";

export function formatarNumero(valor: number) {
    return Number(valor).toLocaleString("fr-FR").replace(",", " ");
}

const returnDate = (date: string) => {
    return `${new Date(date).getDate().toString().padStart(2, "0")}-${(new Date(date).getMonth() + 1).toString().padStart(2, "0")}-${new Date(date).getFullYear().toString().padStart(2, "0")}`;
}

type bonusProps = {
    id_bonus: number,
    id_usuario: number,
    criado_por: number,
    id_trajeto: number,
    descricao: string,
    valor_bonus: string,
    data_inicio: string,
    data_fim: string,
    criacao: string,
    atualizacao: string,
    valor_restante: string,
    estado: string
}


export function Nova() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const { id_trajeto_empresa_selecionado, id_horario } = useParams();
    const [trajeto, setTrajeto] = useState<TrajetoProps | null>(null);
    const [bonus, setBonus] = useState<bonusProps | null>(null);
    const [valorPorPagar, setValorPorPagar] = useState<string>("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [bonusUsados, setBonusUsados] = useState(false);
    const [metodoPagamento, setMetodoPagamento] = useState<string>("referencia");

    useEffect(() => {
        const fetchDados = async () => {

            if (!id_horario) {
                return;
            }

            try {
                const response = await api.get(`/horarios-trajeto/${id_horario}`);
                setTrajeto(response.data)

            } catch (error) {
                const err = error as ErrorResponse;

                if (err?.response?.data) {
                    toast.error(err.response.data.mensagem);
                }
                else if (err?.response?.data?.statusCode) {
                    toast.error(err.response.data.mensagem);
                }
                else
                    toast.error("Falha na conexão de rede.");
            }
        };

        fetchDados();
    }, [id_horario])

    const handleGetBonus = async () => {
        try {
            const response = await api.get(`/bonus/${user?.id_usuario}/${id_trajeto_empresa_selecionado}`);

            setBonus(response.data);

        } catch (error) {
            const err = error as ErrorResponse;

            if (err?.response?.data) {
                toast.error(err.response.data.mensagem);
            }
            else if (err?.response?.data?.statusCode) {
                toast.error(err.response.data.mensagem);
            }
            else
                toast.error("Falha na conexão de rede.");
        }

        setIsPopupOpen(true)
    }

    const handleReserva = async () => {

        try {

            if (!user?.id_usuario || !id_trajeto_empresa_selecionado) return

            //toast(user?.id_usuario.toString())

            await api.post(`/reservas`, {
                id_usuario: user?.id_usuario,
                id_trajeto: id_trajeto_empresa_selecionado
            });

            toast.success("Reserva criada com sucesso.")
        } catch (error) {
            const err = error as ErrorResponse;

            if (bonus?.valor_restante !== undefined) {
                setValorPorPagar(prev => (Number(prev) + Math.round(Number(bonus.valor_restante))).toString());
            }

            if (err?.response?.data) {
                toast.error(err.response.data.mensagem);
            }
            else if (err?.response?.data?.statusCode) {
                toast.error(err.response.data.mensagem);
            }
            else
                toast.error("Falha na conexão de rede.");
        } finally {
            navigate("/dashboard/utilizador/reservas")
        }
    }

    useEffect(() => {
        setValorPorPagar((Number(trajeto?.preco) * Number(trajeto?.percentual_parcela_inicial) / 100).toString());
    }, [trajeto?.preco, trajeto?.percentual_parcela_inicial]);

    const handleChangeValor = () => {
        if (bonus?.valor_restante !== undefined) {
            setValorPorPagar(prev => (Number(prev) - Math.round(Number(bonus.valor_restante))).toString());
        }

        setBonusUsados(true)
    };


    const returnModoPagamento = (modo: string) => {
        const IBAN = "AO06.0000.6000.0006.7320.9000.1012.3020.1";
        const BANCO = "7320.9000.1012.3020.1";
        const REFERENCIA = "AO9032001999";

        const metodoPagamento = [
            {
                modo: "referencia",
                numero: REFERENCIA,
                title: "Pague para esta referência: "
            },
            {
                modo: "banco",
                numero: BANCO,
                title: "Deposite neste número de conta: "
            },
            {
                modo: "transferencia",
                numero: IBAN,
                title: "Transfira para este IBAN: "
            },
        ];

        const metodo = metodoPagamento.find(m => m.modo === modo);

        return (
            <div>
                {metodo ?
                    <div className="grid gap-2">
                        <p>{metodo.title}</p>
                        <p className="text-lg font-semibold">{metodo.numero}</p>
                    </div>
                    :
                    <p>Escolha um modo de pagamento.</p>
                }
            </div>
        );
    };


    // Exibe um carregador se `user` for nulo
    if (!user) {
        return (
            <div className="flex w-64 items-center justify-center h-screen">
                <Loading size={5} />
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col p-10 w-full">
                <div className="flex flex-col justify-center items-center gap-20">

                    <h1 className="font-bold text-xl text-center">Nova Reserva</h1>

                    {trajeto && id_horario ?

                        <div className="flex flex-col justify-center items-center gap-6 shadow-lg rounded-lg w-[50%] p-10">
                            <div className="font-bold text-2xl flex items-center gap-4">
                                <p className="text-[#F2994A]">{trajeto?.partida}</p>
                                <FaArrowCircleRight size={18} />
                                <p className="text-green-500">{trajeto?.destino}</p>
                            </div>

                            <div>
                                <p>{/*returnDate(date)} às {horarioSelecionado*/} </p>
                            </div>

                            <div className="text-sx grid text-center gap-6">
                                <p><span className="font-bold text-4xl">{formatarNumero(Number(trajeto?.preco))} Kzs</span></p>
                                <div className="text-sx grid text-center gap-1">

                                    <p>Percentual parcela inicial: <span className="font-semibold">{Number(trajeto?.percentual_parcela_inicial).toFixed(0)}%</span></p>
                                    <p>Parcela inicial: <span className="font-semibold">{formatarNumero((Number(trajeto?.preco) * Number(trajeto?.percentual_parcela_inicial)) / 100)} Kzs</span></p>

                                </div>
                            </div>

                            <div onClick={handleGetBonus} className='bg-gradient-to-r w-[50%] font-semibold duration-500 cursor-pointer from-[#F2994A] to-[#FFCA28] py-3 px-4 text-center rounded-lg text-white text-sm'>
                                <p>Reservar</p>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center gap-6 shadow-lg rounded-lg w-[50%] p-10">
                            <p>Este trajeto não foi encontrado.</p>
                        </div>
                    }

                </div>
            </div>

            {isPopupOpen &&
                <Popup
                    content={
                        <div className="flex justify-between items-start gap-4 h-full">

                            <div className="flex flex-col justify-between items-start gap-8">

                                <div className="flex justify-between items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="pagamento"
                                            value="referencia"
                                            onChange={(e) => setMetodoPagamento(e.target.value)}
                                            checked={metodoPagamento === "referencia"}
                                        />
                                        Referência
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="pagamento"
                                            value="banco"
                                            onChange={(e) => setMetodoPagamento(e.target.value)}
                                            checked={metodoPagamento === "banco"}
                                        />
                                        Banco
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="pagamento"
                                            value="transferencia"
                                            onChange={(e) => setMetodoPagamento(e.target.value)}
                                            checked={metodoPagamento === "transferencia"}
                                        />
                                        Transferência
                                    </label>
                                </div>

                                <div>
                                    <p>{returnModoPagamento(metodoPagamento)}</p>
                                </div>

                                <div onClick={handleReserva} className='bg-gradient-to-r flex w-full justify-center items-center font-semibold duration-500 cursor-pointer from-green-400 to-green-600 py-3 rounded-lg text-white text-sm'>
                                    <p className=" tex-center">Finalizar</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 shadow-md rounded-lg p-4 w-[40%] h-full">

                                <div className="grid gap-2 w-full ">
                                    <p>Valor por pagar: <span className="font-semibold text-xl">{valorPorPagar} Kzs</span></p>
                                    {trajeto?.preco &&
                                        <div className="grid grid-cols-2 gap-4">
                                            {Number(valorPorPagar).toFixed(0) === Number(trajeto?.preco).toFixed(0) ?

                                                <p
                                                    onClick={() => {
                                                        setValorPorPagar((Number(trajeto?.preco) * Number(trajeto?.percentual_parcela_inicial) / 100).toString());
                                                    }}
                                                    className="text-center border w-[14vw] p-2 rounded-lg shadow-sm cursor-pointer font-semibold"
                                                >
                                                    Pagar a parcela ({trajeto?.percentual_parcela_inicial}%)
                                                </p>

                                                :


                                                <p
                                                    onClick={() => setValorPorPagar(Number(trajeto.preco).toFixed(0))}
                                                    className="text-center border p-2 rounded-lg shadow-sm cursor-pointer font-semibold"
                                                >
                                                    Pagar valor total
                                                </p>
                                            }

                                        </div>
                                    }

                                </div>

                                <hr />
                                {bonus && !bonusUsados ?
                                    <div className="grid gap-4">
                                        <p className="font-semibold text-base">Bônus: {Number(bonus.valor_restante).toFixed(0)} Kzs</p>

                                        <div onClick={handleChangeValor} className='bg-gradient-to-r flex justify-center items-center font-semibold duration-500 cursor-pointer from-yellow-400 to-yellow-600 p-2 rounded-lg text-white text-sm'>
                                            <p className=" tex-center">Utilizar os bônus</p>
                                        </div>
                                    </div>

                                    :

                                    <div>

                                        <p>{bonusUsados ? "Bônus usados." : " Não tens nenhum bônus para este trajeto."}</p>

                                    </div>
                                }
                            </div>
                        </div>
                    }
                    size="w-[62vw]"
                    header="Pagamento"
                    onClose={() => setIsPopupOpen(false)}
                />
            }
        </>

    )
}