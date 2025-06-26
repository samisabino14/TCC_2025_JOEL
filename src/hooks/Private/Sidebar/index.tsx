import { useState, useContext } from 'react';
import { AuthContext, UserProps } from '../../../contexts/AuthContext';
import { FaHome, FaUser, FaTags, FaChartBar, FaCalendarAlt, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Loading from '../../../components/Loading';

export type User = {
    user: UserProps
}

function Sidebar({ user }: User) {
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true); // Controla se a transição foi concluída
    const { signOut } = useContext(AuthContext);

    const handleSignOut = () => {
        if (typeof signOut === 'function') {
            signOut();
        }
    };
    const handleRedirect = (link: string) => {

        navigate(`administrador/${link}`)
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        if (isCollapsed) {
            setIsFullyExpanded(false); // Oculta textos imediatamente ao colapsar
        }
    };

    const handleTransitionEnd = () => {
        if (!isCollapsed) {
            setIsFullyExpanded(true); // Só exibe textos após expansão completa
        }
    };

    const returnRole = (role: number) => {

        if (role === 1) return `Gestor`;
        if (role === 2) return `Administrador`;
        if (role === 3) return `Funcionário`;
        if (role === 4) return `Usuário`;
        return null;
    };

    const menuItems = [
        { icon: <FaHome />, label: 'Dashboard', link: "/dashboard" },
        { icon: <FaUser />, label: 'Usuários', link: "administrador/usuarios" },
        { icon: <FaTags />, label: 'Promoções e ofertas', link: "" },
        { icon: <FaCalendarAlt />, label: 'Horários', link: "administrador/horarios-trajeto" },
        { icon: <FaChartBar />, label: 'Histórico de pesquisas', link: "" },
    ];

    const settingsItems = [
        { icon: <FaCog />, label: 'Configurações', link: "configuracoes" },
        { icon: <FaQuestionCircle />, label: 'Suporte ao Cliente', link: "dashboard" },
        { icon: <FaSignOutAlt />, label: 'Sair', isLogout: true },
    ];

    // Exibe um carregador se `user` for nulo
    if (!user) {
        return (
            <div className="flex w-64 items-center justify-center h-screen">
                <Loading size={5} />
            </div>
        );
    }


    return (
        <div
            className={`h-[100vh] bg-gray-100 shadow-lg ${isCollapsed ? 'w-20' : 'lg:w-1/5'} transition-all duration-500 border-r`}
            onTransitionEnd={handleTransitionEnd} // Evento de transição
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 p-3 bg-white">
                <div className="flex items-center justify-start gap-1 bg-white">
                    {/*
                    <img
                        src="/log_jobs.svg"
                        alt="Logo Padrão"
                        className="rounded-full w-12 h-12"
                    />
                    */}

                    {!isCollapsed ? (
                        <h1 className='text-2xl font-bold'><span className='text-amber-500'>JQ</span>Travel</h1>
                    )
                        :
                        <h1 className='font-bold'><span className='text-amber-500'>JQ</span>T</h1>
                    }

                </div>

                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 hidden md:block focus:outline-none"
                >
                    {isCollapsed ? '▶' : '◀'}
                </button>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center p-4">
                <Link to={`perfil`}>
                    <img
                        src="/log_jobs.svg"
                        alt="Admin"
                        className="rounded-full w-8 h-8 border p-1"
                    />
                </Link>

                {!isCollapsed && (

                    <div className='flex justify-between items-center w-full'>

                        <Link
                            to={`perfil`}
                            className={`ml-3 w-full ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                        >

                            {user.nome}

                        </Link>

                    </div>
                )}
            </div>

            <hr className="mb-4 border-gray-100" />

            {/* Menu Items */}
            <div className="px-4">
                <p className={`text-xs text-gray-500 mb-2 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    MENU
                </p>
                {menuItems.map((item, index) => (
                    <Link to={`${item.link}`}
                        key={index}
                        className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} gap-4 px-2 py-3 hover:bg-gray-50 rounded-md cursor-pointer`}
                    >
                        <span className="text-lg text-gray-600">{item.icon}</span>

                        {!isCollapsed && (
                            <p className={`text-sm font-medium text-gray-700 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                {item.label}
                            </p>
                        )}

                    </Link>
                ))}
            </div>

            <hr className="my-4 border-gray-100" />

            {/* Configurations */}
            <div className="px-4">
                <p className={`text-xs text-gray-500 mb-2 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    ÚTIL
                </p>
                {settingsItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            if (item.isLogout) handleSignOut();
                            else if (item?.link) {
                                handleRedirect(item.link)
                            }
                        }}
                        className={`flex items-center justify-${isCollapsed ? 'center' : 'start'} gap-4 px-2 py-3 hover:bg-gray-50 rounded-md cursor-pointer ${item.isLogout ? 'text-red-500' : 'text-gray-700'
                            }`}
                    >
                        <p className="text-lg">{item.icon}</p>
                        {!isCollapsed && (
                            <p className={`text-sm font-medium ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                {item.label}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
