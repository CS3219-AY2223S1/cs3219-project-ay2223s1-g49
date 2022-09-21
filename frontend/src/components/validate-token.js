import axios from "axios";
import { URL_TOKEN_VALIDATION } from '../configs';

export default async function validateToken(_token){
    try{
        const instance = axios.create({
            headers: {
                'Authorization': _token
            }
        })

        const res = await instance.post(URL_TOKEN_VALIDATION)

        return (res && res.status==200);
    } catch (err){
        return false    
    }
}