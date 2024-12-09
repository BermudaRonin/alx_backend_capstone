import { useEffect, useState } from "react"
import TaskItem from "./TaskItem";
import { Task } from "../api/types.ts";

import * as actions from '../api/actions.ts'
import { useAuth } from "../auth/hooks.ts";

enum State {
    IDLE = "idle",
    PENDING = "pending",
    REJECTED = "rejected",
    FULFILLED = "fulfilled"
}

export default function TasksList() {
    const { token } = useAuth();
    const [state, setState] = useState<State>(State.IDLE);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const getTasks = async () => {
            setState(State.PENDING);
            setErrorMessage("");
            const { data, error } = await actions.getTasks({ 
                token : token || ""
            })
            if (data) {
                setTasks(data);
                setState(State.FULFILLED);
            } else {
                setErrorMessage(error);
                setTasks([]);
                setState(State.REJECTED)
            }
        }
        getTasks();
    }, [])

    if (state === State.FULFILLED) {
        if (tasks.length === 0) {
            <div>
                No tasks - create one
            </div>
        }

        return <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {tasks.map((task) => <TaskItem key={task.name} task={task} />)}
        </div>
    }
    if (state === State.REJECTED) {
        return <div> Error {errorMessage}</div>
    }

    return <div> Loading ... </div>

}