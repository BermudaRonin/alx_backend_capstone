import { Navigate } from "react-router";
import { useAuth } from "./hooks";

export function PrivateRoute(props: {
    children: React.ReactNode
}) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? props.children : <Navigate to='/auth'/>
}

export function PublicRoute(props: {
    children: React.ReactNode
}) {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? props.children : <Navigate to='/'/>
}