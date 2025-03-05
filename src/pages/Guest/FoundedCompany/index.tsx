import { useEffect, useState } from 'react';
import { api } from '../../../services/apiClient';
import { useParams } from 'react-router-dom';
import { CompanyProps } from '../../../components/Guest/Home/CardsCompanies';
import { ErrorResponse } from '../../../App';
import toast from 'react-hot-toast';


export const FoundedCompany = () => {

    const { serviceId, latitude, longitude } = useParams();

    const [companies, setCompanies] = useState<CompanyProps[]>([]);
    const [companyId, setCompanyId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const findServiceCompany = async () => {
            setIsLoading(true);

            try {
                const response = await api.get(`/serviceCompany/service/${serviceId}`);
                setCompanies(response.data);
            } catch (error) {
                const err = error as ErrorResponse;

                if (err?.response?.data)
                    toast.error(err.response.data.mensagem);
                else
                    toast.error("Falha na conexão de rede.");
            }
            setIsLoading(false); // Encerra o carregamento em caso de erro
        }

        findServiceCompany()

    }, [serviceId])

    return (
        <div className="lg:mt-20 mt-16 max-w-[100vw]">

            <div className='bg-red-500 h-52'>
                <h1>Service ID: {serviceId}</h1>
                <h2>Latitude: {latitude}</h2>
                <h2>Longitude: {longitude}</h2>
            </div>
        </div>

    )
}