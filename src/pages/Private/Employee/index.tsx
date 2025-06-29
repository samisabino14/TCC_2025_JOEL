import {

    FormEvent,
    useContext,
    useEffect,
    useState,

} from 'react';
import toast from 'react-hot-toast';
import { ReservaProps } from '../Dashboard/Reservas';
import { ErrorResponse } from '../../../App';
import { AuthContext } from '../../../contexts/AuthContext';
import { api } from '../../../services/apiClient';
import { TrajetoByID } from '../../../components/Private/TrajetoByID';
import { UsuarioByID } from '../../../components/Private/UsuarioByID';
import { Link } from 'react-router-dom';
import { EmpresaProps } from '../Dashboard/Funcionarios/ModalFuncionario';

interface Funcionario {
    id_funcionario: number,
    id_usuario: number,
    id_tipo_funcionario: number,
    criacao: string,
    atualizacao: string,
    id_empresa: number
}



function Employee() {
    const { user } = useContext(AuthContext);

    const [empresa, setEmpresa] = useState<EmpresaProps | null>(null);
    const [funcionarios, setFuncionarios] = useState<Funcionario[] | null>([]);
    const [trajetosEmpresa, setTrajetosEmpresa] = useState<[] | null>([]);
    const [reservas, setReservas] = useState<ReservaProps[]>([]);
    const [alterado, setAlterado] = useState(false);

    useEffect(() => {

        const fetchDados = async () => {

            if (!user) {
                return;
            }

            try {

                const funcionarioResponse = await api.get(`/funcionarios/` + user.id_usuario);

                const response = await api.get(`/empresas/` + funcionarioResponse.data.id_empresa);
                const funcionariosEmpresa = await api.get(`/funcionarios/empresa/` + funcionarioResponse.data.id_empresa);
                const trajetosEmpresa = await api.get(`/trajetos-empresas/empresa/` + funcionarioResponse.data.id_empresa);

                setEmpresa(response.data);
                setFuncionarios(funcionariosEmpresa.data);
                setTrajetosEmpresa(trajetosEmpresa.data);

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
    }, [user])

    useEffect(() => {

        const fetchDados = async () => {

            if (!user) {
                return;
            }

            try {

                const funcionarioResponse = await api.get(`/funcionarios/` + user.id_usuario);

                const response = await api.get(`/reservas/empresa/` + funcionarioResponse.data.id_empresa);

                setReservas(response.data)

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
    }, [user, alterado])

    const cards = [
        {
            id: 1,
            title: "Reservas",
            size: reservas?.length,
            //link: "reservas"
        },
        {
            id: 2,
            title: "Trajetos",
            size: trajetosEmpresa?.length,
            //link: "trajetos"
        },
        {
            id: 3,
            title: "Funcionários",
            size: funcionarios?.length,
            //link: "funcionarios"
        }
    ]

    return (
        <>
            <div className="flex flex-col md:gap-4 gap-2 w-full overflow-y-auto p-2 lg:p-2 lg:px-4 h-[100vh]">

                <div className="flex flex-col lg:flex-row justify-start lg:my-4 lg:items-center items-start lg:gap-8 md:gap-6 gap-4 w-full">
                    {empresa &&
                        <h1 className='font-bold text-lg'>{empresa.nome}</h1>
                    }
                </div>

                <div className="h-full flex w-full flex-col xl:flex-row md:gap-4 gap-2 rounded-2xl">

                    <div className="flex flex-col md:gap-4 w-full gap-2 h-full">

                        <div className="flex flex-col lg:flex-row md:gap-4 lg:h-[18%] w-full gap-2">
                            {cards.map((card, index) => (
                                card?.link ? (
                                    <Link
                                        to={`${card?.link}`}
                                        key={index}
                                        className="w-full flex items-center duration-500 gap-4 justify-start lg:hover:shadow-lg bg-white shadow-md p-4 lg:rounded-2xl md:rounded-xl rounded-lg"
                                    >
                                        <img
                                            src="/log_jobs.svg"
                                            alt="Logo Padrão"
                                            className="rounded-full w-10 h-10 bg-gray-100 p-2"
                                        />
                                        <div className="flex flex-col text-gray-600 justify-between items-start">
                                            <h1 className="text-xl font-bold">{card?.size}</h1>
                                            <h1 className="text-xs font-semibold">{card?.title}</h1>
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        key={index}
                                        className="w-full flex items-center duration-500 gap-4 justify-start lg:hover:shadow-lg bg-white shadow-md p-4 lg:rounded-2xl md:rounded-xl rounded-lg"
                                    >
                                        <img
                                            src="/log_jobs.svg"
                                            alt="Logo Padrão"
                                            className="rounded-full w-10 h-10 bg-gray-100 p-2"
                                        />
                                        <div className="flex flex-col text-gray-600 justify-between items-start">
                                            <h1 className="text-xl font-bold">{card?.size}</h1>
                                            <h1 className="text-xs font-semibold">{card?.title}</h1>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="lg:w-full h-full flex flex-col md:gap-4 gap-2 rounded-2xl">
                            <div className=" bg-white h-full shadow-md p-4 rounded-2xl">
                                <div className="overflow-x-auto">
                                    {reservas?.length > 0 ? (
                                        <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
                                            <thead className="bg-gray-300 text-white">
                                                <tr>
                                                    <th className="px-4 py-2 text-left">ID</th>
                                                    <th className="px-4 py-2 text-left">Trajeto</th>
                                                    <th className="px-4 py-2 text-left">Cliente</th>
                                                    <th className="px-4 py-2 text-left">Status</th>
                                                    <th className="px-4 py-2 text-left">Criação</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservas.map((reserva, index) => (
                                                    <tr
                                                        key={reserva.id_reserva}
                                                        className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                                            } hover:bg-gray-200 transition`}
                                                    >
                                                        <td className="px-4 py-2 border">{reserva.id_reserva}</td>
                                                        <td className="font-semibold py-2 border"> <TrajetoByID id_trajeto={reserva.id_trajeto} /></td>
                                                        <td className="px-4 py-2 border"><UsuarioByID id_usuario={reserva.id_usuario} /></td>

                                                        <td

                                                        >
                                                            <div className='flex justify-between px-4 py-2'>
                                                                <span
                                                                    className={`font-semibold 
                                                        ${reserva.status_reserva.toLocaleLowerCase() === "confirmada"
                                                                            ? "text-green-600"
                                                                            : reserva.status_reserva.toLocaleLowerCase() === "pendente" ? "text-orange-400" : "text-red-600"
                                                                        }
                                                    `}
                                                                >{reserva.status_reserva}</span>

                                                                {reserva.status_reserva.toLocaleLowerCase() !== "confirmada" &&
                                                                    <span
                                                                        onClick={async () => {

                                                                            try {
                                                                                await api.patch("reservas/" + reserva.id_reserva, {
                                                                                    novoStatus: "confirmada"
                                                                                })

                                                                                setAlterado(!alterado)
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

                                                                        }}
                                                                        className='text-xs bg-green-600 px-6 py-1 text-white font-semibold rounded-md cursor-pointer'
                                                                    >

                                                                        Confirmar
                                                                    </span>
                                                                }

                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 border text-gray-500">
                                                            {new Date(reserva.criacao).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-500 mt-4">
                                            Nenhuma reserva encontrada.
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>


    );
}

export default Employee;
