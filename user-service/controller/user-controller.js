import { ormCreateUser as _createUser } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const resp = await _createUser(username, password);
            if (resp.err == null) {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: resp.message});
            }

            switch(resp.err.code) {
                case 11000:
                    return res.status(409).json({message: resp.message});

                default:
                    return res.status(500).json({message: "Unknown error occured"})
            }

        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Unexpected database failure when creating new user!'})
    }
}
