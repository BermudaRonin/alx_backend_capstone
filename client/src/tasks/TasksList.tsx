import { useEffect, useState } from "react"
import TaskItem from "./TaskItem";
import { Task } from "../api/types.ts";

import * as actions from '../api/actions.ts'
import { useAuth } from "../auth/hooks.ts";
import useLoader from "../website/utils/useLoader.ts";
import useValues from "../website/utils/useValue.ts";
import useValue from "../website/utils/useValue.ts";





export default function TasksList() {
    const defaultValue = {
        data: [] as Task[],
        msg: "" as string
    }
    const value = useValue<typeof defaultValue>(defaultValue);
    const loader = useLoader();

    useEffect(() => {
        const getTasks = async () => {
            loader.startLoading();
            const responseData = await actions.getTasks()
            console.log({ responseData })
        }
        getTasks();
    }, [])

    if (loader.isSuccess) {
        if (value.isEmptyArray("data")) return <div> No tasks </div>
        return <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {value.get("data").map((task) => <TaskItem key={task.name} task={task} />)}
        </div>
    }
    if (loader.isFailure) return <div> Error {value.get("msg")}</div>
    return <div> Loading ... </div>

}