import { Task } from "../types"


type GetTasksResponse = {
    data: Task[] | null,
    error: string | null
}

export async function getTasks(): Promise<GetTasksResponse> {
    try {
        const fakeTasks = [
            { id: "1", name: "Task 1", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "2", name: "Task 2", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "3", name: "Task 3", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "4", name: "Task 4", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "5", name: "Task 5", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "6", name: "Task 6", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "7", name: "Task 7", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "8", name: "Task 8", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "9", name: "Task 9", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "10", name: "Task 10", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "11", name: "Task 11", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "12", name: "Task 12", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "13", name: "Task 13", is_completed: false, date_created: new Date(), owner: "John Doe" },
            { id: "14", name: "Task 14", is_completed: false, date_created: new Date(), owner: "John Doe" },
        ]
        return {
            data: fakeTasks,
            error: null
        }
    } catch (error : any) {
        return {
            data: null,
            error: error.message || "Error fetching tasks"
        }
    }
}