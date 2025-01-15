import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';


const GuestRoute: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { '@wanna@pro_25.token': token } = parseCookies();

    if (token) return <Navigate to="/dashboard" />
    
    return <Outlet />
}

export default GuestRoute;