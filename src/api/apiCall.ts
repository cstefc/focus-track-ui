import {getAuth} from "firebase/auth";

const API = import.meta.env.VITE_API_URL;


export async function getApi<T>(path: string): Promise<T | null> {
    const auth = getAuth();
    try {
        if (auth.currentUser) {
            const result = await fetch(`${API}${path}`, {
                method: "GET",
                headers: {
                    Authorization: auth.currentUser ? `Bearer ${await auth.currentUser.getIdToken()}` : '',
                },
            })
            if (result.ok) return await result.json() as T;
        }
    } catch (e) {
        console.error(e);
    }

    return null;
}

export async function sendApi<T>(path: string, method: string, body: string): Promise<T | null> {
    const auth = getAuth();
    try {
        if (auth.currentUser) {
            const result = await fetch(`${API}${path}`, {
                method: method.toUpperCase(),
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth.currentUser ? `Bearer ${await auth.currentUser.getIdToken()}` : '',
                },
            })
            if (result.ok) {
                return await result.json() as T;
            }

        }
    } catch (e) {
        console.error(e);
    }
    return null
}

export async function deleteApi(path: string): Promise<void> {
    const auth = getAuth();
    try {
        if (auth.currentUser) {
            const token = await auth.currentUser.getIdToken();
            void fetch(`${API}${path}`, {
                method: "DELETE",
                headers: {
                    Authorization: auth.currentUser ? `Bearer ${token}` : '',
                },
            })
        }
    } catch (e) {
        console.error(e);
    }
}

