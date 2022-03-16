import axios from "axios";
import type { AxiosInstance } from "axios";

interface AxiosCache {
    axiosInstance: AxiosInstance;
};

/**
 * Global is used here to maintain a cached instance across hot reloads
 * in development. This prevents instances growing exponentially
 * during API Route usage.
 */
//@ts-ignore
let cached: AxiosCache = global.axios;

if (!cached) {
    //@ts-ignore
    cached = global.axios = { axiosInstance: null };
};

function getAxiosInstance() {
    if (cached.axiosInstance) return cached.axiosInstance;
    return cached.axiosInstance = axios.create({
        baseURL: process.env.NEXTAUTH_URL,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export default getAxiosInstance;