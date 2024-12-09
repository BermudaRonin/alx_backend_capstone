import { useAuth } from "../hooks";
import Logout from "./Logout";

export default function Profile() {
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) return null;
    return <div className="flex items-center justify-between">
        <div> Welcome user</div>
        <Logout />
    </div>
}