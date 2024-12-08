import { createContext, useEffect, useState } from "react";
import { User } from "../types.ts";


type Value = {
    user: User | null;
    login: () => void
    logout: () => void
}
const defaultValue: Value = {
    user: null,
    login: () => null,
    logout: () => null
}
export const AuthContext = createContext<Value>(defaultValue)

export const AuthProvider = (props: { children : React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    function login() {
        const fakeUser: User = { name: "John Doe" };
        setUser(fakeUser)
    }
    function logout() {
        setUser(null);
    }
    const value: Value = { user , login , logout }
    
    useEffect(() => {
       console.log("State updated -- Auth ", value)
    }, [value])
    
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}