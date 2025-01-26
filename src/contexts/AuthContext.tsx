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
    id: string,
    ksId: number,
    email: string,
    status: boolean,
    isOnline: boolean,
    Employee: {
        id: string,
        ksId: number,
        personId: string,
        companyId: string,
        accountId: string,
        employeeLevelId: string,
        status: boolean,
        createdAt: string,
        updatedAt: string,
        Person: {
            id: string,
            ksId: number,
            name: string,
            biNumber: string,
            wannaId: string,
            genre: string,
            birthDate: string,
            profilePhoto: string,
            phoneNumber: string,
            email: string,
            country: string,
            localityId: string,
            createdAt: string,
            updatedAt: string,
            EmployeeLevel: {
                id: string,
                ksId: number,
                level: number,
                status: boolean,
                createdAt: string,
                updatedAt: string,
            }
        }
        company: {
            id: string,
            ksId: number,
            name: string,
            email: string,
            phoneNumber: string,
            logo: string,
            openHour: string,
            closeHour: string,
            description: string,
            latitude: number,
            longitude: number,
            status: boolean,
            canSchedule: boolean,
            sectorId: string,
            companyTypeId: string,
            subscriptionId: string,
            subscription:
            {
                id: string,
                planType: string,
                price: number,
                indication: string,
                description: string,
                status: true,
                createdAt: string,
                updatedAt: string
            }
            localityId: string,
            Colors: {
                name: string,
                color: string
            }
        }
    },
    Roles: [
        {
            id: string,
            ksId: number,
            designation: number,
            status: true,
            createdAt: string,
            updatedAt: string
        },
    ],
    token: string | null,
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate(); // Hook para redirecionar o usuário

    const [user, setUser] = useState<UserProps | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@wanna@pro_25.token': token } = parseCookies();

        if (token) {

            api.get('/accounts/me/details').then(response => {

                const account = response.data;

                const {

                    id,
                    ksId,
                    email,
                    status,
                    isOnline,
                    Employee,
                    Roles

                } = account;

                const user = {
                    id,
                    email,
                    ksId,
                    status,
                    isOnline,
                    Employee,
                    Roles,
                    token
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
            // Remove o cookie
            destroyCookie(undefined, '@wanna@pro_25.token', {
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

            const response = await api.post('/accounts/session', {
                email,
                password
            });

            const {

                account,
                tokens

            } = response.data;

            const token = tokens.access_token;

            const {

                id,
                ksId,
                status,
                isOnline,
                Employee,
                Roles,

            } = account;

            setCookie(undefined, '@wanna@pro_25.token', token, {
                maxAge: 60 * 60 * 24, // Expires in 1 day
                path: '/' // Path accessed by cookie
            });

            const user = {
                id,
                ksId,
                email,
                status,
                isOnline,
                Employee,
                Roles,
                token
            };

            setUser(user);

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Logado com sucesso!');

        } catch (error) {
            const err = error as ErrorResponse;

            if (err?.response?.data) {
                toast.error(err.response.data.message);
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