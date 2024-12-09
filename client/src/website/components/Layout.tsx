import { Outlet } from "react-router";
import Profile from "../../auth/components/Profile";

export default function RootLayout() {
    const classNames = {
        container : "max-w-screen-sm mx-auto px-4 py-16 flex flex-col gap-8",
        card: "bg-[--bg-auto] rounded-xl shadow-lg p-8 flex flex-col gap-4"
    }
    return <div className={classNames.container}>
        <Profile />
        <div className={classNames.card}>
            <Outlet  />
        </div>
    </div>
}