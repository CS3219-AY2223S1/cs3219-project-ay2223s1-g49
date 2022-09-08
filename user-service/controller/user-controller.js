import { ormCreateUser as _createUser } from '../model/user-orm.js'
import { ormAuthUser as _authUser } from '../model/user-orm.js';
import { ormCheckUser as _checkUser } from '../model/user-orm.js';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const SECRET_KEY = crypto.randomBytes(16).toString('hex')

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const resp = await _createUser(username, password);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function authUser(req, res) {
    try{
        const { username, password } = req.body;

        if (!username || username==="" || !password || password===""){
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }

        const resp = await _authUser(username, password);
        console.log(resp)

        if (resp.err){
            return res.status(500),json({message: 'Error occured during authentication'})
        } else {
            if (resp){
                console.log(`${username} successfully authenticated!`)
                const user = { username: username }
                let token = jwt.sign({ user:user },"TEST_KEY")
                console.log(token)
                res.status(200).cookie('token', token, { httpOnly: true });
                res.json({ token });
                console.log(res)
                return res
  //              return res.status(200).json({message: `Logged in as ${username}!`, token: token});
            } else {
                console.log(`Authentication failed for ${username}`)
                return res.status(403).json({message: `Authentication failed for ${username}!`})
            }
        }
    } catch (err){
        console.error(err)
        return res.status(500).json({message: 'Error occured during login.'})
    }
}

export async function checkUser(req, res) {
    try{
        const { username } = req.body;
        if (!username) return res.status(400).json({message: 'Username is missing!'});

        const resp = await _checkUser(username);
        
        if (!resp) {
            return res.status(200).json({message: `${username} does not exist`});
        } else {
            return res.status(200).json({message: `${username} exists!`});
        }

    } catch (err){
        console.error(err)
        return res.status(500).json({message: 'Error occured during check.'})
    }
}
