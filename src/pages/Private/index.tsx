import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';
import Sidebar from '../../components/Private/Sidebar';

function Private() {
    const { user } = useContext(AuthContext);

    const { '@wanna@pro_25.token': token } = parseCookies();

    if (!token) return <Navigate to="/login" />

    return (
        <div className='bg-gray-50 h-[100vh] w-full '>

            <div className='flex justify-start gap-4 text-sm'>
                <Sidebar user={user} />

                <Outlet />
            </div>
        </div>
    )
}

export default Private