import { useState } from "react";
import Tabs from "../../website/ui/Tabs";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

export default function AuthPage() {
    const [tab, setTab] = useState(0);
    return <>
        <div className="flex items-center justify-between">
            <h1> Auth </h1>
            <Tabs tabs={["Login", "Register"]} defaultActiveTab={tab} onSelect={setTab} />
        </div>
        <div className="pt-4"> {{ 0: <LoginForm />, 1: <RegisterForm /> }[tab]}</div>
    </>
}