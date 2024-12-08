
export type Task = {
    id: string;
    name: string;
    is_completed: boolean;
    date_created: Date;
    owner: string;
}
export type User = {
    name: string;
}