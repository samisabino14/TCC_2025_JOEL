import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';

const GuestRoute: React.FC = () => {

    const { user } = useContext(AuthContext);

    if (user && user.token) return <Navigate to="/dashboard" />

    return <Outlet />
}

export default GuestRoute;