import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:9000/api/v1",
    withCredentials: true,
});

export default axiosInstance;