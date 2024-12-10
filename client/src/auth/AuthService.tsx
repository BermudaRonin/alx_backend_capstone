import { createContext, useEffect, useState } from "react";
import { TokenResponse, User } from "../api/types";
import * as actions from "../api/actions";

type AuthContextType = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (tokenResponse: TokenResponse) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthService = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<AuthContextType['token']>(localStorage.getItem("token"));
    const [user, setUser] = useState<AuthContextType['user']>(null);

    const login = (response: TokenResponse) => {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setUser(response.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const getCurrentUser  = async () => {
            if (!token) return; // Avoid unnecessary API call if no token

            const response = await actions.getCurrentUser ();
            if ('error' in response) {
                console.error("Failed to fetch current user:", response.error);
                return logout(); // Optionally handle error more gracefully
            }
            login(response);
        };

        if (token && !user) {
            getCurrentUser ();
        }
    }, [token, user]);


    const value: AuthContextType = { token, user, isAuthenticated: !!token && !!user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

