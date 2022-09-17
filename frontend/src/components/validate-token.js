import axios from "axios";
import { URL_TOKEN_VALIDATION } from '../configs';

export default async function validateToken(_token){
    try{
        const res = await axios.post(URL_TOKEN_VALIDATION, { token: _token })
            .catch((err) => {
                console.log(err);
                return false
            })
        return (res && res.status === 200);
    } catch (err){
        return false
    }
}