import { verifyAccess } from "./utils/auth.js";

export const auth = async (req,res,next) => {
    try{
        const token = (req.headers['authorization'])
        console.log(`Checking access rights`);
        
        if (await verifyAccess(token)){
            next()
        } else {
            return res.status(403).send()
        }
    } catch(err){
        console.log('Server error');
        return res.status(500).send()
    }
}

export const block = (req,res,next) => {
    res.status(403).send('Forbidden')
}

export const allow = (req,res,next) => {
    next()
}

