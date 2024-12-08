import { useContext } from "react"
import { TasksContext } from "../../logic/tasks.ctx";
import TaskItem from "../task";

export default function TasksList() {
    const { tasks, state } = useContext(TasksContext);

    if (state === 'fulfilled') {
        return <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {tasks.map((task) => <TaskItem key={task.name} task={task} />)}
        </div>
    }
    if (state === 'rejected') {
        return <div>
            No tasks - create one
        </div>
    }

    return <div> Loading ... </div>

}