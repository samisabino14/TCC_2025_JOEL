import { useContext } from "react";
import { AuthContext, AuthContextData } from "./AuthContext";

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Nenhum contexto encontrado.');
    }

    return context;
};