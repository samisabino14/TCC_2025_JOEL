import {

    createContext,
    ReactNode,

} from 'react';


export type AuthContextData = {

    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    //signOut: () => void;
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

/*
export type SignUpProps = {
    name: string,
    biNumber: string,
    birthDate: string,
    genre: string,
    email: string,
    phoneNumber: string,
    localityId: string,
    road: string,
    houseNumber: string
}
*/

export type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

