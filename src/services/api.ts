import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies'

import { AuthTokenError } from './errors/AuthTokenError';
//import { signOut } from '../contexts/AuthContext';

export const setupAPIClient = (context = undefined) => {

    const cookies = parseCookies(context);

    const api = axios.create({

        //baseURL: 'http://172.20.10.3:5000',
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@tcc_2025.token']}`
        }
    })

    api.interceptors.response.use((response) => {

        return response;

    }, (err: AxiosError) => {

        if (err.response?.status === 401) {

            if (typeof window !== 'undefined') {
                // SIGNOUT USER
                //signOut();
            } else {
                return Promise.reject(new AuthTokenError());
            }
        }

        if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
            
            // Lidar com o tempo limite da requisição
            console.error('A requisição excedeu o tempo limite');
            alert('A requisição excedeu o tempo limite');

        } else if (err.response && err.response?.status === 503) {
            
            // Lidar com o status 503 (Serviço Indisponível)
            console.error('A API está em manutenção. Tente novamente mais tarde.');
            alert('A API está em manutenção. Tente novamente mais tarde.');

            // Aqui você pode exibir uma mensagem para o usuário informando sobre a manutenção
        }

        return Promise.reject(err);
    })

    return api;
}
