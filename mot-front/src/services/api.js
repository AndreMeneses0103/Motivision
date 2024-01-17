import axios from "axios";
import { accessToken, refreshToken } from "../scripts/getUser";
//PARA ACESSAR O LOCALHOST NO CELULAR, USAR O DEVTOOLS NO GOOGLE CHROME COM DEPURACAO
const api = axios.create({
    baseURL:"//localhost:8080",
    headers:{
        "Content-Type": "application/json",
        Authorization: `${accessToken()}`,
        "Refresh-Token": `${refreshToken()}`,
    }
});
const blob_api = axios.create({
    baseURL:"//localhost:8080",
    headers:{
        "Content-Type": "application/json",
        Authorization: `${accessToken()}`,
        "Refresh-Token": `${refreshToken()}`,
    },
    responseType:'blob'
})
const log_api = axios.create({
    baseURL:"//localhost:8080",
    headers:{
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(config =>{
    if(accessToken() !== null){
        config.headers.Authorization = accessToken();
    }

    if(refreshToken()!==null){
        config.headers["Refresh-Token"] = refreshToken();
    }

    return config;
})

blob_api.interceptors.request.use(config =>{
    if(accessToken() !== null){
        config.headers.Authorization = accessToken();
    }

    if(refreshToken()!==null){
        config.headers["Refresh-Token"] = refreshToken();
    }

    return config;
})

export {api, log_api, blob_api};