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


function Profile() {
    const { user } = useContext(AuthContext);

    const [search, setSearch] = useState("");

    const cards = [
        {
            id: 1,
            title: "1"
        },
        {
            id: 2,
            title: "2"
        },
        {
            id: 3,
            title: "3"
        }
    ]

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

    return (
        <>
            <div className="flex flex-col md:gap-4 gap-2 w-full overflow-y-auto p-2 lg:p-2 lg:px-4 h-[100vh] bg-gray-100">
            
            </div>
        </>


    );
}

export default Profile;
