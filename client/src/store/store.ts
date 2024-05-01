import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { ITopic } from "../models/ITopic";
import AuthService from "../services/AuthService";
import axios from "axios";
import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import FileService from "../services/FileService";
import QuestionsService from "../services/QuestionsService";
import { IQuestion } from "../models/IQuestions";
import { IAnswer } from "../models/IAnswer";

export default class Store{
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    topics = [] as ITopic[];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setTopics(topis: ITopic[]){
        this.topics = topis;
    }
    
    setUser(user: IUser){
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    async fetchTopics() {
        try{
            const response = await $api.get<ITopic[]>(`${process.env.REACT_APP_API_URL}/questions/topics`)
            if(response.data.length === 0) return;
            this.setTopics(response.data)
        }catch(e: any){
            throw new Error(e.response?.data.message)
        }
    }

    async fetchQuestionsByTopic(idTopic: number) {
        try{
            const response = await $api.get<IQuestion[]>(`${process.env.REACT_APP_API_URL}/questions/getquestionsbytopic/${idTopic}`)
            return response.data;

        }catch(e: any){
            throw new Error(e.response?.data.message)
        }
    }
    async fetchAnswersByQuestion(idQuestion: number){
        try{
            const response = await $api.get<IAnswer[]>(`${process.env.REACT_APP_API_URL}/questions/getanswersbyquestion/${idQuestion}`)
            return response.data;

        }catch(e: any){
            throw new Error(e.response?.data.message)
        }
    }
    async login (email: string, password: string) {
        try{
            this.setLoading(true)
            const response = await AuthService.login(email,password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch(e: any){
            throw new Error(e.response?.data.message)
        }
        finally{
            this.setLoading(false)
        }
    }

    async registration (email: string, password: string, name?: string) {
        try{
            this.setLoading(true)
            const response = await AuthService.registration(email,password, name)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch(e: any){
            throw new Error(e.response?.data.message)
        }
        finally{
            this.setLoading(false)
        }
    }

    async logout () {
        try{
            this.setLoading(true)
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
            this.setLoading(false)
        }catch(e: any){
            console.log(e.response?.data.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try{
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true})
            
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch(e){
            console.log(e);
        }
        finally{
            this.setLoading(false)
        }
    }

    async uploadAvatar(file: File){
        try{
            this.setLoading(true)
            if(this.user.avatar) {
                await this.deleteAvatar();}
            const res = await FileService.uploadAvatar(file);
            this.setUser(res.data)
            this.setLoading(false)
        }catch(e){
            console.log(e)
        }
    }

    async deleteAvatar(){
        try{
            this.setLoading(true)
            const res = await FileService.deleteAvatar();
            this.setUser(res.data)
            this.setLoading(false)
        }catch(e){
            console.log(e)
        }
    }

    async addQuestionWithAnswers(answers: {bool: boolean, text: string}[],question: string,topic: number){
        try{
            this.setLoading(true)
            await QuestionsService.addQuestionWithAnswers(answers, question, topic);
            this.setLoading(false)
            return {message: 'Успешно'}
        }catch(e: any){
            throw new Error(e.response?.data.message)
        }
        finally{
            this.setLoading(false)
        }
    }

}

