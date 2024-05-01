import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async error => {
    const originalRequest = error.config;
    if(error.response.status === 401 && !error.config._isRetry){
        originalRequest._isRetry = true;
        try{
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        }catch(e){
            console.log('Пользователь не авторизован')
        }
    }
    throw error;
})

export default $api;