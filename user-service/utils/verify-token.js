import jwt from 'jsonwebtoken'
import { ormGetBlacklistToken as _getBlacklistedToken } from '../model/user-orm.js'
const SECRET_KEY = process.env.JWT_SECRET_KEY

export const verifyToken = async _token => {
    if (!_token || _token == '') 
        return false
    
    try{
        jwt.verify(_token,SECRET_KEY)

        const resp = await _getBlacklistedToken(_token)
        if (resp.err || !resp){
            console.log('invalid token');
            return false
        } else {
            console.log('valid token');
            return true
        }
    } catch (err) {
        console.log('tampered token');
        return false
    }


}