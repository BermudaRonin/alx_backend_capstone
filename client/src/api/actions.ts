import {  TokenResponse, Credentials, TasksQuery } from "./types";
import { privateApi, publicApi } from './config'

export async function registerUser(credentials: Credentials) {
    try {
        if (!credentials.password || !credentials.username) {
            return { error: "Username and password are required" };
        }
        const response = await publicApi.post("/users/register/", credentials)
        console.log({response})
        if (response.status !== 201) return { error : response?.data?.message || "Registration failed" }
        return response.data as TokenResponse
    } catch (error: any) {
        console.error("Registration error:", error); 
        return { error: error.response?.data?.error || error.message || "Unknown Error" };
    }
}
export async function loginUser(credentials: Credentials) {
    try {
        if (!credentials.password || !credentials.username) {
            return { error: "Username and password are required" };
        }
        const response = await publicApi.post("/users/login/", credentials)
        if (response.status !== 200) return { error : response?.data?.message || "Login failed" }
        return response.data as TokenResponse
    } catch (error: any) {
        console.error("Login error:", error); 
        return { error: error.response?.data?.message || error.message || "Unknown Error" };
    }
}
export async function getCurrentUser() {
    try {
        const response = await privateApi.get("/users/current/")
        if (response.status !== 200) return { error : response?.data?.message || "Registration failed" }
        return response.data as TokenResponse
    } catch (error: any) {
        console.error("Fetching user error:", error); 
        return { error: error.response?.data?.message || error.message || "Unknown Error" };
    }
}
// todo

export async function getTasks(query?: TasksQuery) {
    try {
        const response = await privateApi.get("/tasks/", {
            params: {
                completed: query?.completedOnly ? 'true' : undefined,
                pending: query?.pendingOnly ? 'true' : undefined 
            },
        })
        if (response.status !== 200) return { error : response?.data?.message || "Registration failed" }
        return response.data 
    } catch (error: any) {
        console.error("Fetching user error:", error); 
        return { error: error.response?.data?.message || error.message || "Unknown Error" };
    }
}