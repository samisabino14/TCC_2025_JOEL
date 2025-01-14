import { useEffect, useState } from "react";
import { api } from "../../../../services/apiClient";
import { FiCheckCircle } from "react-icons/fi";
import { formatNumber } from '../../../../utils/functions/formatNumber';
import toast from 'react-hot-toast';
import { ErrorResponse } from '../../../../App';


export interface PlansProps {
    id: string,
    planType: string,
    indication: string,
    description: string,
    price: number,
    status: boolean,
    createdAt: string,
    updatedAt: string,
    Features: FeaturesProps[]
}

export interface FeaturesProps {
    id: string,
    name: string,
    description: string,
    value: string,
}


export function Plans() {

    const [isLoading, setIsLoading] = useState(false);
    const [plans, setPlans] = useState<PlansProps[]>([]);

    useEffect(() => {

        const fetchAndStoreAllPlans = async () => {
            try {
                setIsLoading(true);
                // Busca todos os serviços da API
                const response = await api.get('/subscriptionPlan');

                if (response.data.length === 0) {
                    setPlans([]);
                    return;
                }

                // Armazena todos os serviços retornados no localStorage
                //localStorage.setItem('plans', JSON.stringify(response.data));
                setPlans(response.data);
            } catch (error) {
                const err = error as ErrorResponse;

                if (err?.response?.data)
                    toast.error(err.response.data.message);
                else if (err?.response?.data?.statusCode)
                    toast.error(err.response.data.message);
                else
                    toast.error("Falha na conexão de rede.");
            } finally {
                setIsLoading(false); // Encerra o carregamento em caso de erro
            }
        };

        fetchAndStoreAllPlans();
    }, []);

    /*
    const plans2 = [
        {
            id: "1",
            name: "Bronze",
            price: 19999,
            features: [
                {
                    id: "1",
                    designation: "Listagem básica no sistema de busca."
                },
                {
                    id: "2",
                    designation: "Relatórios mensais simplificados sobre o comportamento de pesquisa dos usuários."
                },
                {
                    id: "3",
                    designation: "Agendamentos limitados de visitas."
                },
            ],
            indicationDescription: {
                indication: "Empresas que desejam experimentar o potencial do Wanna Pro e aumentar sua visibilidade localmente.",
                descrition: "Ideal para pequenas empresas que estão começando a utilizar o Wanna Pro. Com o plano Bronze, você obtém acesso básico à plataforma, permitindo listar seus serviços e ser encontrado por clientes próximos."
            }
        },
        {
            id: "2",
            name: "Silver",
            price: 49999,
            features: [
                {
                    id: "1",
                    designation: "Prioridade na listagem de buscas em relação ao plano Bronze."
                },
                {
                    id: "2",
                    designation: "Relatórios semanais detalhados com insights sobre buscas e agendamentos."
                },
                {
                    id: "3",
                    designation: "Agendamentos ilimitados de visitas."
                },
                {
                    id: "4",
                    designation: "Suporte dedicado via chat."
                },
            ],
            indicationDescription: {
                indication: "Empresas em crescimento que desejam uma presença mais forte e informações detalhadas para tomar decisões estratégicas.",
                descrition: "Projetado para empresas que buscam melhorar sua presença no mercado e atrair mais clientes. O plano Silver oferece recursos adicionais para otimizar seu desempenho na plataforma."
            }
        }, {
            id: "3",
            name: "Gold",
            price: 99999,
            features: [
                {
                    id: "1",
                    designation: "Listagem em destaque nas buscas, sempre no topo."
                },
                {
                    id: "2",
                    designation: "Relatórios diários personalizados com insights avançados e recomendações."
                },
                {
                    id: "3",
                    designation: "Agendamentos ilimitados e gestão de horários integrada."
                },
                {
                    id: "4",
                    designation: "Suporte premium com atendimento prioritário."
                },
                {
                    id: "5",
                    designation: "Acesso a funcionalidades exclusivas, como campanhas de marketing direcionadas."
                },
            ],
            indicationDescription: {
                indication: "Empresas líderes de mercado que buscam aproveitar ao máximo os dados e insights para expandir sua base de clientes.",
                descrition: "A escolha perfeita para grandes empresas que desejam maximizar sua visibilidade e obter acesso total às análises da plataforma. O plano Gold proporciona todas as ferramentas necessárias para um crescimento contínuo."
            }
        },
    ]

    */

    if(isLoading){
        return(
            <div>Carregando...</div>
        )
    }

    const handleSubscribe = (plan: PlansProps) => {
        alert(plan.planType);
    }


    return (
        <div className="grid gap-10 w-full">

            <h1 className="text-xl text-center font-semibold">Planos</h1>

            {plans.length > 0 ?

                <div className="grid w-full gap-14 md:gap-4 lg:gap-10 grid-cols-1 md:grid-cols-3 pt-10">

                    {plans.map((plan, index) => (
                        <div
                            key={index} className="md:mx-0 flex flex-col gap-2"
                        >
                            <div
                                key={index}
                                className="relative shadow-lg rounded-t-2xl p-6 bg-white border dark:border-none md:border-none dark:bg-[#322159] dark:text-white"
                            >
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#322159] dark:bg-[#F57C00] text-white text-sm font-semibold rounded-full px-4 py-1 shadow-md">
                                    Plano
                                </div>

                                <div className="flex flex-col gap-10 py-8 items-start text-start">
                                    <div className='flex flex-col gap-4 items-center w-full'>
                                        <h2 className="lg:text-3xl text-2xl font-bold mb-2">Wanna {plan.planType}</h2>

                                        <p className="lg:text-2xl text-2xl font-bold mb-4">
                                            {formatNumber(plan.price)} <span className="text-lg font-semibold ">AOA/MÊS</span>
                                        </p>

                                        <button onClick={() => handleSubscribe(plan)} className='bg-gradient-to-r font-semibold lg:hover:scale-105 duration-500 cursor-pointer from-[#F57C00] to-[#FFCA28] py-3 px-8 rounded-full text-white text-xs lg:text-sm'>
                                            <p>Subscrever</p>
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-4 items-start text-start w-full text-base'>
                                        {plan?.Features?.map((feature, index) => (
                                            <div key={index}
                                                className="flex justify-between font-bold items-center gap-4"
                                            >
                                                <p className="text-green-700"><FiCheckCircle size={20} /></p>
                                                <p className='dark:text-white font-medium'>{feature.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="relative grid gap-4 shadow-lg rounded-b-2xl p-6 bg-white dark:bg-[#322159] dark:text-white text-sm"
                            >
                                <p><span className='dark:text-white font-medium dark:font-bold'>Indicado para:</span> {plan.indication}</p>
                                <p><span className='dark:text-white font-medium dark:font-bold'>Descrição:</span> {plan.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                :

                <div className="flex flex-col items-center justify-center px-4">
                    <div className="text-center">
                        <h3 className="text-sm lg:text-lg font-medium text-gray-900 dark:text-white">
                            Nenhum plano de subscrição encontrado.
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-white">
                            Não existem planos de subscrição cadastrados no momento.
                        </p>
                    </div>
                </div>
            }
        </div>
    );
}
