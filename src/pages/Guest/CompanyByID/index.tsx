import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { api } from '../../../services/apiClient';
import { useParams } from 'react-router-dom';
import { CompanyProps } from '../../../components/Guest/Home/CardsCompanies';
import { ErrorResponse } from '../../../App';

export const CompanyByID = () => {

    const { companyId } = useParams();

    const [company, setCompany] = useState<CompanyProps>();
    const [showPopup, setShowPopup] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const findCompany = async () => {

            if (!companyId) return;

            setIsLoading(true);

            try {

                const response = await api.get(`/company/${companyId}`);
                console.log(response.data);
                setCompany(response.data);

            } catch (error) {

                const err = error as ErrorResponse;

                if (err?.response?.data)
                    toast.error(err.response.data.message);
                else
                    toast.error("Falha na conexão de rede.");
            }
            setIsLoading(false); // Encerra o carregamento em caso de erro
        }

        findCompany()

    }, [companyId]);

    return (
        <div className="lg:mt-20 mt-16 max-w-[100vw]">

            <div className='h-52'>
                <h1>company ID: {companyId}</h1>
            </div>
        </div>

    )
}