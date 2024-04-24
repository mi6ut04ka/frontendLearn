import $api from "../http";
import { IUser } from "../models/IUser";

export default class FileService{
    static uploadAvatar = async (file: File) => {
        if (!file) {
            throw new Error('Файл не выбран');
        }
        const formData = new FormData();
        formData.append('file', file);
        return $api.post<IUser>('file/uploadAvatar/', formData)
    };
    static deleteAvatar = async () => {
        console.log('delete')
        return $api.delete<IUser>('file/deleteAvatar/')
    }
} 