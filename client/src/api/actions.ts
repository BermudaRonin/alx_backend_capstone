import { TokenResponse, User } from "./types";
import { privateApi, publicApi } from './config'

const ep = (endpoint: string) => "http://127.0.0.1:8000/api" + endpoint;
const authHeaders = (token: string) => ({ Authorization: `Token ${token}` })

type ErrorResponse = { error: string }
type SuccessResponse<Data> = { data: Data }

type Credentials = { username: string, password: string }
type TasksQuery = { token: string, completedOnly?: boolean, pendingOnly?: boolean }

type AuthResponseData = { user: User, token: string }


export async function registerUser(credentials: Credentials) {
    try {
        if (!credentials.password || !credentials.username) {
            return { error: "Username and password are required" };
        }
        const response = await publicApi.post("/users/register/", credentials)
        console.log(response)
        if (response.status !== 201) return { error : response?.data?.message || "Registration failed" }
        return response.data as AuthResponseData
    } catch (error: any) {
        console.error("Registration error:", error); 
        return { error: error.response?.data?.message || error.message || "Unknown Error" };
    }
}
export async function loginUser(credentials: Credentials) {
    try {
        if (!credentials.password || !credentials.username) {
            return { error: "Username and password are required" };
        }
        const response = await publicApi.post("/users/login/", credentials)
        if (response.status !== 201) return { error : response?.data?.message || "Registration failed" }
        return response.data as AuthResponseData
    } catch (error: any) {
        console.error("Login error:", error); 
        return { error: error.response?.data?.message || error.message || "Unknown Error" };
    }
}
export async function getCurrentUser() {
    try {
        const response = await privateApi.get("/users/current/")
        if (response.status !== 200) return { error : response?.data?.message || "Registration failed" }
        return response.data as AuthResponseData
    } catch (error: any) {
        console.error("Fetching user error:", error); 
        return { error: error.response?.data?.message || error.message || "Unknown Error" };
    }
}
// todo

export async function getTasks(arg: {
    token: string,
    completedOnly?: boolean,
    pendingOnly?: boolean
}) {
    try {
        const response = await privateApi.get("/tasks/", {
            params: {
                completed: arg.completedOnly ? 'true' : undefined,
                pending: arg.pendingOnly ? 'true' : undefined 
            },
        })
        if (response.status !== 200) return { error : response?.data?.message || "Registration failed" }
        return response.data as AuthResponseData
    } catch (error: any) {
        console.error("Fetching user error:", error); 
        return { error: error.response?.data?.message || error.message || "Unknown Error" };
    }
}