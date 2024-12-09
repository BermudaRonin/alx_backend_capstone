import { AuthService } from "../auth/AuthService";

export default function Services(props: { children: React.ReactNode }) {
    return <AuthService>
        {props.children}
    </AuthService>
}