import { createContext, useState } from "react";
import { TokenResponse, User } from "../api/types";

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

    const value : AuthContextType = { token, user, isAuthenticated: !!token, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

