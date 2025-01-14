import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/UserAuth';

const PublicRoute: React.FC = () => {
    const user = useAuth();
    if (user?.token) return <Navigate to="..." />
    return <Outlet />
}

export default PublicRoute;