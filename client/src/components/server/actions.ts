const endpoint = (endpoint: string) => "http://127.0.0.1:8000/api" + endpoint;

export async function registerUser(credentials: {
    username: string,
    password: string
}) {
    try {
        const response = await fetch(endpoint("/users/register/"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })

        if (!response.ok) {
            throw new Error("Registration failed");
        }
        const data = await response.json();
        console.log({ data })
        return data
    } catch (error : any) {
        return {
            error: error.message || "Unknown Error"
        }
    }
}