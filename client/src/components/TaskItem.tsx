import { Task } from "../types";
import { twMerge } from 'tailwind-merge'
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { useState } from "react";
import Dialog from "./ui/Dialog";

interface Props {
    task: Task
}
enum Modal {
    EDIT = "edit",
    REMOVE = "remove"
}
export default function TaskItem({ task }: Props) {
    const [modal, setModal] = useState<Modal | "">("");

    const handleClick = {
        root: (e: React.MouseEvent) => {
            alert("Clicking")
        },
        edit: (e: React.MouseEvent) => {
            e.stopPropagation();
            setModal(Modal.EDIT)
        },
        remove: (e: React.MouseEvent) => {
            e.stopPropagation();
            setModal(Modal.REMOVE)
        },
        toggle: (e: React.MouseEvent) => {
            e.stopPropagation();
        }
    }
    const classNames = {
        root: twMerge(
            "group cursor-pointer",
            "flex items-center gap-2 flex items-center",
            "gap-2 px-4 py-3",
            "bg-[--bg-auto] rounded",
        ),
        name: twMerge(
            "flex-1",
        ),
        actions: {
            root: "flex items-center gap-1  transition duration-300 ease-in-out group-hover:opacity-100 opacity-0",
            common: "transition duration-300 ease-in-out p-1.5 rounded flex items-center justify-center hover:*:scale-110",
            edit: "!no-line-through",
            remove: "!no-line-through text-red-600",
            toggle: "!no-line-through text-xs font-semibold",
        },

    }
    return <div className={classNames.root} onClick={handleClick.root}>
        <div className={classNames.name}>{task.name}</div>
        <div className={classNames.actions.root}>
            <button className={twMerge(classNames.actions.common, classNames.actions.toggle)} onClick={handleClick.toggle}>
                {task.is_completed ? "Mark as incomplete" : "Mark as complete"}
            </button>
            <button className={twMerge(classNames.actions.common, classNames.actions.edit)} onClick={handleClick.edit}>
                <MdEditNote />
            </button>
            <button className={twMerge(classNames.actions.common, classNames.actions.remove)} onClick={handleClick.remove}>
                <MdDeleteSweep />
            </button>
        </div>
        {modal === Modal.EDIT && <Dialog onClose={() => setModal("")}>
            Editing title
            <div className="flex items-center gap-2">
                <button> Cancel </button>
                <button> Save </button>
            </div>
        </Dialog>}
        {modal === Modal.REMOVE && <Dialog onClose={() => setModal("")}>
            Are you sure ?
            <div className="flex items-center gap-2">
                <button> Cancel </button>
                <button> Delete </button>
            </div>
        </Dialog>}
    </div>
}