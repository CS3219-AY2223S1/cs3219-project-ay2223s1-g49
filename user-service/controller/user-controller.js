import { ormCreateUser as _createUser, 
         ormCheckUser as _checkUser,
        ormDeleteUser as _deleteUser } from '../model/user-orm.js'


async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const usernameInUse = await _checkUser(username);
            if (usernameInUse) {
                return res.status(409).json({message: `Username ${username} has been used!`});
            }

            const resp = await _createUser(username, password);
            if (resp.err == null) {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: resp.message});
            }

            // Other unknown error occured
            return res.status(500).json({message: resp.message})

        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Unexpected database failure when creating new user!'})
    }
}

async function deleteUser(req, res) {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({message: 'Username to delete is missing!'});
        }

        const isValidAccount = await _checkUser(username)
        if (!isValidAccount) {
            return res.status(403).json({message: `Account with username ${username} is not valid, unable to delete account`})
        }

        const resp = await _deleteUser(username);
        if (resp.err) {
            return res.status(500).json({message: 'Error occured when deleting user'})
        } else {
            return res.status(202).json({message: `Deleted new user ${username} successfully!`});
        }

    } catch (err) {
        console.log("failed at deleteUser")
    }
}

export { createUser, deleteUser }