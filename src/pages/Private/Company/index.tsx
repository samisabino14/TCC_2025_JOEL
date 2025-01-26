import {

    FormEvent,
    useState,
    useEffect,
    useContext,

} from 'react';
import toast from 'react-hot-toast';
import { LayoutDashboard } from '../../../hooks/Private/LayoutDashboard';
import { api } from '../../../services/apiClient';
import { ErrorResponse } from '../../../App';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';

function Company() {
    const { user } = useContext(AuthContext);

    const [companyService, setcompanyService] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const fetchCompanyService = async () => {
            if (!user) {
                return;
            }

            try {
                setIsLoading(true);

                const response = await api.get('/serviceCompany/myService', {
                    params: {
                        companyId: user.Employee.company.id
                    }
                });

                setcompanyService(response.data);

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

        fetchCompanyService();
    }, [user]);

    const cards = [
        {
            title: "Total de impressões",
            items: [],
            link: "impressoes"
        },
        {
            title: "Serviços",
            items: companyService,
            link: "servicos"
        },
        {
            title: "Agendamentos",
            items: [],
            link: "agendamentos"
        },
    ]

    const handleSearch = async (e: FormEvent) => {

        e.preventDefault();

        toast.success(search)
    }

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
            <LayoutDashboard
                cards={cards}
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default Company;
