import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../logic/auth.ctx"
import { useNavigate } from "react-router";
import Tabs from "../ui/Tabs";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";


export default function AuthPage() {
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);
    const [tab, setTab] = useState(1);

    const handleLogin = () => {
        login();
        console.log("Fake login");
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user])

    // const panel: Record</number, React.ReactNode> = 
    return <>
        <div className="flex items-center justify-between">
            <h1> Auth </h1>
            <Tabs tabs={["Login", "Register"]} defaultActiveTab={tab} onSelect={setTab} />
        </div>
        <div className="pt-4"> {{ 0: <LoginForm />, 1: <RegisterForm /> }[tab]}</div>
    </>
}