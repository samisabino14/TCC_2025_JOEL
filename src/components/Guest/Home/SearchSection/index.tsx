import { useEffect, useState } from "react";
import { orangeText } from "../../../../utils/functions/orangeText";
import { AiFillInfoCircle } from "react-icons/ai";
import { api } from "../../../../services/apiClient";
import HighlightedText from "../../../HighlightedText";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../../../App";


export interface ServiceProps {
    id: string,
    ksId: number,
    name: string,
    description: string,
    status: boolean,
    createdAt: string,
    updatedAt: string
}


export interface LocationProps {
    latitude: number,
    longitude: number
}




export const SearchSection = () => {

    const [results, setResults] = useState<ServiceProps[]>([]);
    const [serviceSelected, setServiceSelected] = useState<ServiceProps | null>();
    const [serviceSearch, setServiceSearch] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [servicesLocalStorage, setServicesLocalStorage] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<LocationProps | null>(null);

    const [labelText, setLabelText] = useState('O que procuras?');

    const navigate = useNavigate();

    useEffect(() => {
        let index = 0;
        const labels = ['O que procuras?', 'Serviço pretendido'];

        const intervalId = setInterval(() => {
            index = (index + 1) % labels.length;
            setLabelText(labels[index]);
        }, 3000);

        return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    }, []);

    useEffect(() => {

        const fecthStoredServices = () => {
            //Recupera a lista completa de serviços do localStorage
            const storedServices = JSON?.parse(localStorage?.getItem('allServices')) || [];

            setServicesLocalStorage(storedServices);
        }

        fecthStoredServices();

    }, [isFocused]);

    useEffect(() => {

        const fetchGeolocation = () => {

            // Função para pegar a localização
            if (typeof window !== 'undefined' && 'geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (/*errorLocation*/) => {
                        //setErrorLocation(errorLocation.message);
                        toast.error("Erro ao tentar obter a localização. Verifique suas permissões.");
                        return;
                    }
                );
            } else {
                toast.error("Seu navegador não suporta geolocalização.");
                return;
            }
        }

        fetchGeolocation()

    }, [location]);

    const handleServiceSearch = async (term: string) => {

        // Limpa o estado se o termo estiver vazio
        if (term.length === 0) {
            setError(true);  // Define o estado de erro para verdadeiro
            setServiceSelected(null);
            setResults([]);
            return;
        } else {
            setError(false); // Reseta o estado de erro quando o campo não está vazio
        }

        // Atualiza o termo de pesquisa
        setServiceSearch(term);
        const storedServices = JSON?.parse(localStorage.getItem('allServices')) || [];
        
        if (storedServices.length > 0) {

            // Filtra os resultados localmente em todos os dados armazenados
            const filteredResults = storedServices.filter((service: ServiceProps) =>
                service.name.toLowerCase().includes(term.toLowerCase())
            );
            
            if (filteredResults.length > 0) {
                // Se houver resultados no filtro local, usa-os
                setResults(filteredResults);
                console.log('Resultados filtrados localmente');
            } else {
                // Se não houver resultados locais, faz a requisição à API
                console.log('Nenhum resultado local encontrado, buscando na API...');
                await fetchAndStoreAllServices(term);
            }
        } else {
            // Se não houver dados armazenados, faz a requisição à API
            console.log('Nenhum dado armazenado, buscando na API...');
            await fetchAndStoreAllServices(term);
        }
    };

    const handleSelectedService = (service: ServiceProps) => {
        setServiceSelected(service)
    }
    // Função auxiliar para buscar todos os dados da API e armazená-los
    const fetchAndStoreAllServices = async (term: string) => {
        try {
            setIsLoading(true);
            // Busca todos os serviços da API
            const response = await api.get('/services/search', {
                params: { term },
            });

            if (response.data.length === 0) {
                setResults([]);
                return;
            }

            // Armazena todos os serviços retornados no localStorage
            localStorage.setItem('allServices', JSON.stringify(...servicesLocalStorage, response.data));

            setResults(response.data);

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

    const handleSearch = () => {
        if (!serviceSelected) {
            toast.error('Selecione um serviço.');
            setError(true);
            return;
        }

        // Verifica se a localização já foi obtida
        if (!location?.latitude || !location?.longitude) {
            toast.error("Permita a localização.");
            alert("Permita a localização.");
            return
        }

        navigate(`/entidadesencontradas/${serviceSelected.id}/${location.latitude}/${location.longitude}`);
    };


    return (
        <div className="flex xl:flex-row justify-center items-center lg:h-[90vh] md:h-[90vh] h-[80vh] bg-[#161634] w-full transition-all duration-500 dark:border-b-8 border-[#F57C00] rounded-b-3xl">

            <div className="flex xl:h-[100vh] w-[92%] md:w-[88%] text-white lg:flex-row flex-col-reverse justify-between items-center ">

                <div className="flex flex-col gap-10 w-full lg:w-[40%]">
                    <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold text-center lg:text-start ">Encontre os {orangeText('serviços')} que {orangeText('você')} precisa, onde {orangeText('estiver')}!</h1>
                    <div className="grid gap-2 lg:gap-4">
                        {serviceSelected &&
                            <div className="flex cursor-pointer text-sm items-center text-amber-500">
                                <AiFillInfoCircle className='text-lg' />
                                <p className="p-2" onClick={() => setServiceSelected(null)}>Alterar o serviço</p>
                            </div>
                        }

                        {error &&

                            <div className="flex text-sm items-center text-red-500">
                                <AiFillInfoCircle className='text-lg' />
                                <p className="p-1">Preencha este campo</p>
                            </div>

                        }

                        <div className={`flex items-center md:gap-2 gap-1 text-sm text-black rounded-full bg-white p-2 w-full`}>

                            <input
                                type="search"
                                name="search"
                                id=""
                                onChange={(e) => {
                                    handleServiceSearch(e.target.value);
                                }}
                                value={serviceSelected?.name}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder={serviceSelected ? serviceSelected.name : labelText}
                                className="p-2 w-[90%] border rounded-full border-[#F57C00] text-black bg-white font-semibold"
                            />

                            <button
                                onClick={handleSearch}
                                className='bg-gradient-to-r font-semibold hover:scale-105 duration-500 cursor-pointer from-[#F57C00] to-[#FFCA28] py-2 lg:px-8 px-4 rounded-full text-white md:text-sm text-xs'
                            >
                                <p>Pesquisar</p>
                            </button>
                        </div>

                        {isLoading ?
                            <div className='flex justify-center items-center shadow-md mb-4 text-sm rounded-lg h-[10vh]'>

                                <svg
                                    className="animate-spin h-5 w-5 text-amber-400 right-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                            </div>
                            :
                            <div className="bg-gray-50 text-gray-600 rounded-md">
                                {(results.length > 0 && serviceSearch && !serviceSelected) ?
                                    <ul className={`shadow-md text-sm rounded-lg max-h-[50vh] overflow-y-auto px-3`}>
                                        {results.map((service, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectedService(service)}
                                                className="p-3 cursor-pointer"
                                            >
                                                <HighlightedText text={service.name} searchTerm={serviceSearch} />
                                                <p className="text-[10px] truncate ...">{service.description}</p>
                                            </li>
                                        ))}
                                    </ul>

                                    :

                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isFocused && !serviceSearch ? 'max-h-[50vh] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <ul className="shadow-md text-sm rounded-lg overflow-y-auto">
                                            {servicesLocalStorage.map((service: ServiceProps, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectedService(service)}
                                                    className="p-3 cursor-pointer"
                                                >
                                                    <p>{service.name}</p>
                                                    <p className="text-[10px] truncate ...">{service.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                        }

                    </div>

                    <p className={`text-center text-base md:text-xl font-semibold lg:text-start lg:w-[90%]`}>Listamos todas as entidades que ministram o serviço que procuras.</p>
                </div>

                <div>
                    <img
                        src="/logo_wanna_pro.svg"
                        alt="Logo da Wanna Pro"
                        width={0}
                        height={0}
                        className="w-[240px] h-44 lg:h-72 lg:w-[320px] "
                    />
                </div>

            </div>
        </div>

    )
}