import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import returnRole from './ReturnRole';


function Private() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // Para verificar a rota atual
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Se não há token, redirecione para o login
        if (user && !user?.token) {
            navigate('/login');
            return;
        }

        // Aguarda o usuário ser carregado
        if (!user) return;
        let rolePath;
        if (user.tipo_usuario) {
            rolePath = returnRole(user.tipo_usuario);
        }

        // Se o usuário não está na rota correta, redirecione
        if (!location.pathname.includes(`/dashboard/${rolePath}`)) {
            navigate(`/dashboard/${rolePath}`);
        }

        setLoading(false); // Indica que o carregamento terminou
    }, [user, navigate]);

    if (loading || !user) {
        // Exibe um indicador de carregamento enquanto verifica a autenticação
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading size={10} />
            </div>
        );
    }

    // Renderiza o conteúdo para usuários autenticados
    return (
        <div className={`bg-gray-50 h-[100vh] w-full`}>
            <div className="flex justify-start text-sm w-full">
                <Outlet />
            </div>
        </div>
    );
}

export default Private;
