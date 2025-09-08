import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem("access");

    if (!token) return config;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now) {
            const refresh = localStorage.getItem("refresh");
            if (refresh) {
                try {
                    const response = await axios.post(`${BASE_URL}/refresh/`, { refresh });
                    const newToken = response.data.access;
                    if (newToken) {
                        token = newToken;
                        localStorage.setItem("access", newToken);
                    }
                } catch (error) {
                    console.error("Refresh token expirado ou inválido:", error);
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    localStorage.removeItem("user");
                    window.location.href = "/";
                    return Promise.reject(new Error("Sessão expirada. Faça login novamente."));
                }
            } else {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("user");
                window.location.href = "/login";
                return Promise.reject(new Error("Usuário deslogado"));
            }
        }

        config.headers = config.headers ?? {};
        (config.headers as any)["Authorization"] = `Bearer ${token}`;

        return config;
    } catch (e) {
        console.error("Erro no interceptor de auth:", e);
        return config;
    }
});

export default api;
