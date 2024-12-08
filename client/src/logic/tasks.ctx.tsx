import React, { createContext } from "react";
import { Task } from "../types.ts";
import * as actions from './actions.ts'

enum State {
    IDLE = "idle",
    PENDING = "pending",
    REJECTED = "rejected",
    FULFILLED = "fulfilled"
}


type Value = {
    tasks: Task[]
    state: State
    errorMessage: string | null
    setTasks: (tasks: Task[]) => void
    getTasks: () => void
    deleteTask: (id: Task['id']) => void
}

const defaultValue: Value = {
    tasks: [],
    state: State.IDLE,
    errorMessage: null,
    setTasks: () => { },
    getTasks: () => { },
    deleteTask: () => { }
}

export const TasksContext = createContext<Value>(defaultValue)

export const TasksProvider = (props: { children: React.ReactNode }) => {
    const [tasks, setTasks] = React.useState<Value['tasks']>(defaultValue.tasks)
    const [state, setState] = React.useState<Value['state']>(defaultValue.state);
    const [errorMessage, setErrorMessage] = React.useState<Value['errorMessage']>(null);

    async function getTasks() {
        console.log("Fetching tasks");
        setState(State.PENDING);
        const { data, error } = await actions.getTasks();
        if (data) {
            setTasks(data);
            setState(State.FULFILLED);
        } else {
            setErrorMessage(error);
            setState(State.REJECTED);
        }
    }

    function deleteTask(id: Task['id']) {
        let arr : Task[] = [];
        arr = tasks.filter((task) => task.id !== id);
        setTasks(arr);
    }

    const value: Value = {
        state,
        tasks,
        errorMessage,
        setTasks,
        getTasks,
        deleteTask
    }
    return <TasksContext.Provider value={value}>{props.children}</TasksContext.Provider>;
}