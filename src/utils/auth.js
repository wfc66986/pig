import Cookies from 'js-cookie'
import { Decrypt } from '@/utils/tools'

const TokenKey = '3F534A044F83ED1077D6F2EDF09C5CD6' 
const UserKey = '678477FBED35FE215D719454EC6340B2';
const PwdKey = 'A2EB63B71DEA4B273AAFA4BA332A01EB';

export function getToken(){
    return Cookies.get(TokenKey)
}

export function setToken(token){
    return Cookies.set(TokenKey, token)
}

export function removeToken(){
    return Cookies.remove(TokenKey)
}

export function setUserInfo(username,password){
    Cookies.set(UserKey,username)
    Cookies.set(PwdKey,password)
}

export function getUserInfo(){
    let user = Cookies.get(UserKey);
    let pwd  = Cookies.get(PwdKey);
    
    if(user&&pwd){
        return {
            username:Decrypt(user),
            password:Decrypt(pwd)
        }
    }else{
        return ""
    }
}

export function removeUserInfo(){
    Cookies.remove(UserKey)
    Cookies.remove(PwdKey)
}