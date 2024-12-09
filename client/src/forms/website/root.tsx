import { useContext } from "react"
import { AuthContext } from "../../../logic/auth.ctx"
import Logout from "../Logout"


export default function Root(props: { children?: React.ReactNode }) {
    const classNames = {
        container : "max-w-screen-sm mx-auto px-4 py-16 flex flex-col gap-8",
        header: "flex items-center justify-between",
        card: "bg-[--bg-auto] rounded-xl shadow-lg p-8 flex flex-col gap-4"
    }
    const { user } = useContext(AuthContext)
    return <div className={classNames.container}>
        {user && <div className={classNames.header}>
            <div> Welcome {user.name}</div>
            <Logout />
        </div>}
        <div className={classNames.card}>
            {props.children}
        </div>
    </div>
}