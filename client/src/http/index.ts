import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
<<<<<<< HEAD

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
=======
export const API_URL ='http://localhost:8000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
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
<<<<<<< HEAD
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true})
=======
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        }catch(e){
            console.log('Пользователь не авторизован')
        }
    }
    throw error;
})

export default $api;