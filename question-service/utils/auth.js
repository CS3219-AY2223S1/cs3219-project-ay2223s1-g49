import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.JWT_SECRET_KEY || "TEST_KEY"

const allowedRoles = [ "admin" ]

export const verifyAccess = async _token => {
    try{
        console.log(SECRET_KEY)
        const valid = await verifyToken(_token)
        if (!valid) return false
        
        const res = jwt.decode(_token)
        const tokenRoles = res.role.split(',')
        
        const matchingRoles = tokenRoles.filter(i => allowedRoles.includes(i))

        return matchingRoles.length > 0;

    } catch (err){
        console.log(err)
        return false
    }

}

const verifyToken = async _token => {
    console.log("checkiong signarute")
    if (!_token || _token == '') 
        return false
    
    try{
        jwt.verify(_token,SECRET_KEY)
        return true

    } catch (err) {
        console.log(err)
        console.log('tampered token');
        return false
    }
}

