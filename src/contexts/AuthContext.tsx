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

export type AuthContextData = {

    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    //signUp: (credentials: SignUpProps) => Promise<void>;
}

export type UserProps = {
    id: string,
    email: string,
    role: string,
    status: boolean,
    token: string
}

export type SignInProps = {
    email: string;
    password: string;
}


export type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate(); // Hook para redirecionar o usuário

    const [user, setUser] = useState<UserProps>({
        id: "",
        email: "",
        role: "",
        status: false,
        token: ""
    });

    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@wanna@pro_25.token': token } = parseCookies();

        if (token) {

            api.get('/accounts/me').then(response => {

                const account = response.data;

                const {

                    id,
                    email,
                    status,
                    access_token

                } = account;

                const role = account.AccountType.designation;

                /*
                api.get('/persons').then(response => {
                    setAuxUser(response.data);
                })
                */

                const user = {
                    id,
                    email,
                    status,
                    role,
                    token: access_token,
                };

                setUser(user);

            }).catch((error) => {
                const err = error as ErrorResponse;

                if (err?.response?.data)
                    console.error(err.response.data.message);
                else
                    console.error("Falha na conexão de rede.");
            })
        }
    }, []);

    const signOut = () => {

        try {
            destroyCookie(undefined, '@wanna@pro_25.token'); // Remove o cookie
            navigate('/login'); // Redireciona para a página de login
            // toast.success('Sessão terminada com sucesso!');
        } catch (err) {
            console.error(err);
            // toast.error('Erro ao deslogar!');
        }
    };


    const signIn = async ({ email, password }: SignInProps): Promise<void> => {
        try {

            const response = await api.post('/accounts/session', {
                email,
                password
            });

            const {

                tokens,
                account

            } = response.data

            const {
                access_token
            } = tokens

            const {
                id,
                status,

            } = account

            const role = account.AccountType.designation;

            setCookie(undefined, '@wanna@pro_25.token', access_token, {
                maxAge: 60 * 60 * 24, // Expires in 1 day
                path: '/' // Path accessed by cookie
            });

            setUser({
                id,
                email,
                status,
                role,
                token: access_token
            });

            api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

            if (role === 1) {
                //Router.push('/dashboard');
            }

            else if (role === 2) {
                //Router.push('/authority');
            }

            else if (role === 3) {
                //Router.push('/employee');
            }

            //toast.success('Logado com sucesso!');

        } catch (error) {
            const err = error as ErrorResponse;

            if (err?.response?.data)
                console.error(err.response.data.message);
            else
                console.error("Falha na conexão de rede.");
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


