import {
    createContext,
    ReactNode,
    useEffect,
    useState
} from 'react';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { api } from "../services/apiClient";
import { ErrorResponse } from "../App";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export type AuthContextData = {

    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    //signUp: (credentials: SignUpProps) => Promise<void>;
}

export type SignInProps = {
    email: string;
    password: string;
}


export type AuthProviderProps = {
    children: ReactNode;
}

export type UserProps = {
    id_usuario: number,
    id_pessoa: number,
    senha: string,
    nome: string,
    email: string,
    tipo_usuario: string,
    token: string | null,
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate(); // Hook para redirecionar o usuário

    const [user, setUser] = useState<UserProps | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@tcc_2025.token': token } = parseCookies();

        if (token) {

            api.get('/usuarios/me/details').then(response => {

                const {
                    id_usuario,
                    id_pessoa,
                    senha,
                    email,
                    tipo_usuario,
                    nome
                } = response.data;

                const user = {
                    id_usuario,
                    id_pessoa,
                    senha,
                    nome,
                    email,
                    tipo_usuario,
                    token
                };

                setUser(user);

            }).catch((error) => {
                const err = error as ErrorResponse;

                if (err?.response?.data)
                    console.error(err.response.data.mensagem);
                else
                    console.error("Falha na conexão de rede.");
            })
        }
    }, []);

    const signOut = () => {
        try {
            // Remove o cookie
            destroyCookie(undefined, '@tcc_2025.token', {
                path: '/', // Certifique-se de usar o mesmo path do cookie
            });

            setUser(null);

            // Após remover o cookie, redireciona para a página de login
            navigate('/login');

            // Exibe uma notificação de sucesso
            toast.success('Sessão terminada com sucesso!');
        } catch (err) {
            console.error('Erro ao deslogar:', err);
            // Exibe uma notificação de erro
            toast.error('Erro ao tentar deslogar!');
        }
    };

    const signIn = async ({ email, password }: SignInProps): Promise<void> => {
        try {

            const response = await api.post('/usuarios/login', {
                email,
                senha: password
            });

            const {
                usuario,
                token
            } = response.data;

            const {
                id_usuario,
                id_pessoa,
                senha,
                tipo_usuario,
                nome
            } = usuario;

            setCookie(undefined, '@tcc_2025.token', token, {
                maxAge: 60 * 60 * 24, // Expires in 1 day
                path: '/' // Path accessed by cookie
            });

            const user = {
                id_usuario,
                id_pessoa,
                senha,
                nome,
                tipo_usuario,
                email,
                token
            };

            setUser(user);

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Logado com sucesso!');

        } catch (error) {
            const err = error as ErrorResponse;

            if (err?.response?.data) {
                toast.error(err.response.data.mensagem);
            }
            else {
                toast.error("Falha na conexão de rede.");
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>

    );
}