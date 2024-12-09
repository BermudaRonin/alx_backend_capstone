
export type Task = {
    id: string;
    name: string;
    is_completed: boolean;
    date_created: Date;
    owner: string;
}
export type User = {
    id: string;
    username: string;
}
export type Credentials = {
    username: string;
    password: string;
}
export type TokenResponse = {
    token: string;
    user: User
}

