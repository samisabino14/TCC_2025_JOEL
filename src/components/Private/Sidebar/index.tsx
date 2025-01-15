import { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { FaHome, FaUser, FaTags, FaChartBar, FaCalendarAlt, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

function Sidebar({ user }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(true); // Controla se a transição foi concluída
    const { signOut } = useContext(AuthContext);

    const handleSignOut = () => {
        if (typeof signOut === 'function') {
            signOut();
        } else {
            console.error('Função signOut não está definida no AuthContext');
        }
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

    const menuItems = [
        { icon: <FaHome />, label: 'Dashboard' },
        { icon: <FaUser />, label: 'Usuários' },
        { icon: <FaTags />, label: 'Promoções e ofertas' },
        { icon: <FaCalendarAlt />, label: 'Horas de pico' },
        { icon: <FaChartBar />, label: 'Histórico de pesquisas' },
    ];

    const settingsItems = [
        { icon: <FaCog />, label: 'Configurações' },
        { icon: <FaQuestionCircle />, label: 'Suporte ao Cliente' },
        { icon: <FaSignOutAlt />, label: 'Sair', isLogout: true },
    ];

    return (
        <div
            className={`h-[100vh] bg-gray-100 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-500`}
            onTransitionEnd={handleTransitionEnd} // Evento de transição
        >
            {/* Header */}
            <div className="flex items-center justify-between p-2 bg-white">
                <img
                    src="/logo_wanna_pro.svg"
                    alt="Admin"
                    className="rounded-full w-12 h-12 "
                />
                {!isCollapsed && <h1 className={`text-lg font-bold ${isFullyExpanded ? 'opacity-100' : 'opacity-0'}`}>Wanna Pro</h1>}

                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 focus:outline-none"
                >
                    {isCollapsed ? '▶' : '◀'}
                </button>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center p-4">
                <img
                    src="/logo_wanna_pro.svg"
                    alt="Admin"
                    className="rounded-full w-8 h-8 border p-1"
                />
                {!isCollapsed && (
                    <div className={`ml-3 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                        <p className="text-sm font-bold">Andrew Smith</p>
                        <p className="text-xs text-gray-500">Administrador</p>
                    </div>
                )}
            </div>

            <hr className="mb-4 border-gray-100" />

            {/* Menu Items */}
            <div className="px-4">
                <p className={`text-xs text-gray-500 mb-2 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>MENU</p>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-start gap-4 px-2 py-3 hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                        <span className="text-lg text-gray-600">{item.icon}</span>
                        {!isCollapsed && (
                            <p className={`text-sm font-medium text-gray-700 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                {item.label}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <hr className="my-4 border-gray-100" />

            {/* Configurations */}
            <div className="px-4">
                <p className={`text-xs text-gray-500 mb-2 ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>ÚTIL</p>

                {settingsItems.map((item, index) => (
                    <div
                        onClick={() => {
                            if (item.isLogout) {
                                handleSignOut();
                            }
                        }}
                        key={index}
                        className={`flex items-center justify-start gap-4 px-2 py-3 hover:bg-gray-50 rounded-md cursor-pointer ${item.isLogout ? 'text-red-500' : 'text-gray-700'
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {!isCollapsed && (
                            <p className={`text-sm font-medium ${isFullyExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                                {item.label}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Sidebar;
