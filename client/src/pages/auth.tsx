import { useContext, useEffect } from "react";
import { AuthContext } from "../logic/auth.ctx"
import { useNavigate } from "react-router";

export default function AuthPage() {
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);

    const handleLogin = () => {
        login();
        console.log("Fake login");
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user])

    return <>
        <h1> Auth </h1>
        <button onClick={handleLogin}> Fake login</button>
    </>
}