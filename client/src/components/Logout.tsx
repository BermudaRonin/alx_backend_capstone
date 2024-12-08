import { useContext } from "react"
import { AuthContext } from "../logic/auth.ctx"

export default function Logout() {
    const { logout } = useContext(AuthContext)
    return <button onClick={logout} className="bg-red-800 h-10 px-2 py-1 rounded">
        <p>Logout</p>
        <p>X</p>
    </button>
}