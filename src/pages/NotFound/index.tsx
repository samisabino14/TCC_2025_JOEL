import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl lg:text-9xl font-bold text-gray-800">404</h1>
            <p className="text-base mt-2 text-gray-600">Página não encontrada.</p>
            <button
                onClick={() => navigate('/')}
                className="mt-4 px-6 py-2 text-blue-500 rounded hover:scale-105 text-sm duration-500"
            >
                Voltar ao início.
            </button>
        </div>
    );
}

export default NotFound;
