import { useContext, useEffect } from "react";
import { AuthContext } from "../../logic/auth.ctx.tsx";
import { useNavigate } from "react-router";
import TasksList from "../TasksList.tsx";
import { TasksContext } from "../../logic/tasks.ctx.tsx";

export default function TasksPage() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { getTasks } = useContext(TasksContext);

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        } else {
            getTasks();
        }
    }, [user])

    return <>
        <h1> Tasks </h1>
        <TasksList />
    </>
}