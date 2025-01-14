import { useEffect, useState } from "react";
import { ErrorResponse } from "../App";
import { AuthContext, AuthProviderProps, SignInProps, UserProps } from "./AuthContext";
import { parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: "",
        email: "",
        role: "",
        status: false,
        token: ""
    });

    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@authlip2022.token': token } = parseCookies();

        if (token) {

            api.get('/accounts/me').then(response => {

                const myAccount = response.data;

                const {

                    id,
                    email,
                    status,

                } = myAccount;

                const role = myAccount.AccountType.designation;

                /*
                api.get('/persons').then(response => {
                    setAuxUser(response.data);
                })
                */
                setUser({
                    id,
                    email,
                    status,
                    role,
                    token
                })

            }).catch((err) => {
                //signOut();
                console.error('Error during authentication:', err);
                // toast.error('Erro ao buscar informações do usuário.');
            })
        }
    }, []);

    const signIn = async ({ email, password }: SignInProps) => {
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

            setCookie(undefined, '@authlip2022.token', access_token, {
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
                console.error("Falha na conexão de rede.");        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    
    );
}

