import { ormCreateUser as _createUser } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const resp = await _createUser(username, password);
            // console.log(resp);
            if (resp.err) { 
                return res.status(400).json({message: resp.message});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: resp.message});
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Unexpected database failure when creating new user!'})
    }
}
