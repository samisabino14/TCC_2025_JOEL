import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { api } from "../../../../services/apiClient";
import { ErrorResponse } from "../../../../App";
import { Company } from "./Company";
import toast from "react-hot-toast";
//import { io } from 'socket.io-client';

export interface CompanyProps {
    id: string;
    name: string;
    image: string;
    locality: {
        id: string,
        ksId: number,
        designation: string,
        status: true,
        createdAt: string,
        updatedAt: string
    };
}

export function CardsCompanies() {

    const [companies, setCompanies] = useState<CompanyProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    /*
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Substitua pela URL correta do backend
        setSocket(newSocket);

        // Mensagem de sucesso na conexão
        newSocket.on('connection_success', (data) => {
            setMessages((prev) => [...prev, `Server: ${data.message}`]);
            console.log(data);

        });

        // Resposta ao evento 'events'
        newSocket.on('events', (data) => {
            console.log(data);
            setMessages((prev) => [...prev, `Server: ${data.message}`]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    */

    useEffect(() => {

        const fetchAndStoreAllPlans = async () => {
            try {
                setIsLoading(true);

                // Busca todas as empresas da API
                /*
                const response = await api.get('/company');

                if (response.data.length === 0) {
                    setCompanies([]);
                    return;
                }

                setCompanies(response.data);
                */

                setCompanies([
                    {
                        id: "1",
                        name: "Luanda",
                        image: "/log_jobs.svg",
                        locality: {
                            id: "",
                            ksId: 1,
                            designation: "Luanda",
                            status: true,
                            createdAt: "",
                            updatedAt: ""
                        }
                    },
                    {
                        id: "2",
                        name: "Benguela",
                        image: "/log_jobs.svg",
                        locality: {
                            id: "",
                            ksId: 1,
                            designation: "Luanda",
                            status: true,
                            createdAt: "",
                            updatedAt: ""
                        }
                    },
                    {
                        id: "3",
                        name: "Cabinda",
                        image: "/log_jobs.svg",
                        locality: {
                            id: "",
                            ksId: 1,
                            designation: "Luanda",
                            status: true,
                            createdAt: "",
                            updatedAt: ""
                        }
                    },
                    {
                        id: "4",
                        name: "Bié",
                        image: "/log_jobs.svg",
                        locality: {
                            id: "",
                            ksId: 1,
                            designation: "Luanda",
                            status: true,
                            createdAt: "",
                            updatedAt: ""
                        }
                    },
                    {
                        id: "5",
                        name: "Lunda Norte",
                        image: "/log_jobs.svg",
                        locality: {
                            id: "",
                            ksId: 1,
                            designation: "Luanda",
                            status: true,
                            createdAt: "",
                            updatedAt: ""
                        }
                    },
                    {
                        id: "6",
                        name: "Lunda Sul",
                        image: "/log_jobs.svg",
                        locality: {
                            id: "",
                            ksId: 1,
                            designation: "Luanda",
                            status: true,
                            createdAt: "",
                            updatedAt: ""
                        }
                    },
                ])

            } catch (error) {
                const err = error as ErrorResponse;

                if (err?.response?.data)
                    toast.error(err.response.data.mensagem);
                else if (err?.response?.data?.statusCode)
                    toast.error(err.response.data.mensagem);
                else
                    toast.error("Falha na conexão de rede.");
            } finally {
                setIsLoading(false); // Encerra o carregamento em caso de erro
            }
        };

        fetchAndStoreAllPlans();
    }, []);


    const handleRedirect = (company: CompanyProps) => {
        //navigate(`/empresas/${company.id}`);
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 lg:mx-auto lg:my-16">
                <div className="flex items-center justify-center pb-4 lg:pt-0 pt-10">
                    <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="w-full">
                            {/* Add Skeleton Card here */}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-10 w-full">

            <h1 className="text-xl text-center font-semibold">Encontre-nos nessas províncias</h1>

            {companies?.length > 0 ? (
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={8}
                    slidesPerView="auto"
                    loop={true}
                    grabCursor={true}
                    resistance={true}
                    resistanceRatio={0.85}
                    touchRatio={1.5}
                    autoplay={{
                        delay: 0, // Sem atraso entre slides
                        disableOnInteraction: false, // Continua mesmo após interação
                    }}
                    speed={5000} // Velocidade de deslizamento (maior = mais lento)
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }}
                    className="w-full py-4"
                >
                    {companies.map((company, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: "auto" }} // Ajusta para caber dinamicamente
                        >

                            <Company
                                company={company}
                                handleRedirect={handleRedirect}
                            />

                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="flex flex-col items-center justify-center px-4">
                    <div className="text-center">
                        <h3 className="text-sm lg:text-lg font-medium text-gray-900 dark:text-white">
                            Nenhuma empresa encontrada
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-white">
                            Não existem empresas cadastradas no momento.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}