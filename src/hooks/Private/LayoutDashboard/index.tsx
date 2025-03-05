import {
    FormEvent,
    useContext,
} from "react";
import toast from "react-hot-toast"
import { FaSearch } from "react-icons/fa"
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { CiCircleList } from "react-icons/ci";

type ComponentProps = {
    cards: CardProps[];
    search: string;
    setSearch: (search: string) => void;
    handleSearch: (e: FormEvent) => Promise<void>;
}

interface CardProps {
    items: {}
}

export const LayoutDashboard = ({ cards, search, setSearch, handleSearch }: ComponentProps) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="w-full flex items-center justify-center h-screen">
                <Loading size={10} />
            </div>
        );
    }

    const appointments = [
        {
            id: 1,
            statusAppointment: "Espera",
            createdAt: "2024-08-12"
        },
        {
            id: 2,
            statusAppointment: "Espera",
            createdAt: "2024-08-12"
        },
        {
            id: 3,
            statusAppointment: "Espera",
            createdAt: "2024-08-12"
        },
    ]

    return (
        <div className="flex flex-col md:gap-4 gap-2 w-full overflow-y-auto p-2 lg:p-2 lg:px-4 h-[100vh] bg-gray-100">

            <div className="flex flex-col lg:flex-row justify-start lg:my-4 lg:items-center items-start lg:gap-8 md:gap-6 gap-4 w-full">

                <form onSubmit={handleSearch} className="flex flex-row justify-between shadow-md lg:rounded-full items-center lg:w-[55%]">

                    <input
                        type="search"
                        placeholder={`O que procuras?`}
                        className="w-full lg:rounded-l-full rounded-l-xl p-2 px-4 bg-white  "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        required
                    />

                    <button type="submit" className="flex text-xs items-center justify-center px-4 lg:rounded-l-full rounded-l-xl lg:w-[12%] hover:scale-110 w-[30%] text-gray-500 font-semibold">
                        <FaSearch />
                    </button>

                </form>

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
                                        <h1 className="text-xl font-bold">{card?.items?.length}</h1>
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
                                        <h1 className="text-xl font-bold">{card?.items?.length}</h1>
                                        <h1 className="text-xs font-semibold">{card?.title}</h1>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    <div className="lg:w-full h-full flex flex-col md:gap-4 gap-2 rounded-2xl">
                        {user?.Employee?.company?.subscription &&

                            <div className="bg-yellow-200 flex items-center justify-between w-full lg:h-[30%] shadow-md p-4 lg:px-8 px-6 rounded-2xl">
                                <div className='lg:w-[100%] w-[80%]'>
                                    <h1 className='md:text-base text-sm font-semibold'>Wanna {user?.Employee?.company.subscription.planType}</h1>
                                    <h2 className='text-sm my-2'>Atualize a tua subscrição. Com um plano superior você pode usufruir de benefícios exclusivos e poderás te diferenciar da concorrência.</h2>
                                </div>
                                <img
                                    src="/log_jobs.svg"
                                    alt="Logo da Jobs"
                                    width={0}
                                    height={0}
                                    className="w-10 h-12 md:h-20 hidden md:block md:w-[240px] lg:w-[100px] "
                                />

                                <div onClick={() => toast("Atualizar a subscrição")} className='bg-white cursor-pointer flex text-center items-center justify-center px-3 p-2 rounded-full'>▶</div>
                            </div>
                        }
                        <div className=" bg-white h-full shadow-md p-4 rounded-2xl">

                        </div>
                    </div>
                </div>

                <div className="lg:w-[30%] h-full flex flex-col md:gap-4 gap-2 rounded-2xl">

                    <div
                        className="flex items-center min-h-[39%] gap-4 justify-start bg-white shadow-md p-4 lg:rounded-2xl md:rounded-xl rounded-lg"
                    >
                        <p>Conteúdo</p>
                    </div>

                    <div
                        className=" bg-white h-[58%] shadow-md p-4 lg:rounded-2xl md:rounded-xl rounded-lg"
                    >
                        <h1 className="text-center p-2 font-semibold">Últimos agendamentos</h1>
                        <hr className="my-2 p-1" />

                        <ul className="w-full flex flex-col items-start justify-start">

                            {appointments.map((appointment, index) => (

                                <Link key={index} className="w-full" to={`dashboard/agendamentos/${appointment.id}`}>

                                    <li className="hover:font-bold shadow-gray-200 hover:bg-gray-50 rounded-lg p-4 flex justify-between gap-3 items-center cursor-pointer">

                                        {appointment.statusAppointment === "Espera" && <span className="p-3 text-sm text-white bg-blue-400 rounded-lg"><CiCircleList size={10} /></span>}
                                        {appointment.statusAppointment === "Pendente" && <span className="p-3 text-sm text-white bg-yellow-300 rounded-lg"><CiCircleList size={10} /></span>}
                                        {appointment.statusAppointment === "Concluido" && <span className="p-3 text-sm text-white bg-green-600 rounded-lg"><CiCircleList size={10} /></span>}
                                        {appointment.statusAppointment === "Cancelado" && <span className="p-3 text-sm text-white bg-red-500 rounded-lg"><CiCircleList size={10} /></span>}

                                        <div className="w-full">
                                            <div className="text-sm font-semibold">
                                                <p>Sami Sabino</p>
                                            </div>

                                            <div className="text-[11px] text-gray-500">
                                                <p>Serviço</p>
                                            </div>
                                        </div>

                                        <span className="text-xs text-gray-500">

                                            {
                                                new Date(appointment.createdAt).getDate() + '/' +
                                                new Date(appointment.createdAt).getMonth() + '/' +
                                                new Date(appointment.createdAt).getFullYear()
                                            }
                                        </span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}