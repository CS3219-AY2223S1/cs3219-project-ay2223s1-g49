import { ormCreateCollab as _createCollab } from './model/collab-orm.js'
import { ormDeleteCollabForUser as _deleteCollabForUser} from './model/collab-orm.js'
import { ormGetUserDetails as _getUserDetails} from './model/collab-orm.js'

export async function createCollab(roomId, username, difficulty) {
    try {
        console.log(`Recieved username of: ${username} and difficulty of: ${difficulty} with roomId: ${roomId}`)
        const isExist = await getUserDetails(username)
        if (isExist) {
            console.log(`user ${username} already exist in database!`)
            return isExist
        }
        if (username && difficulty && roomId) {
            const resp = await _createCollab(username, difficulty, roomId);
            if (resp.err) {
                console.log(`Could not create a collab for ${username} with difficulty of ${difficulty}!`)
            } else {
                console.log(`Created new collab for ${username} with difficulty of ${difficulty} in room ${roomId} successfully!`)
            }
        } else {
            console.log(`Username, difficulty and/or roomId are missing!`)
            console.log(`Username: ${username}, Difficulty: ${difficulty}, RoomId: ${roomId}`)
        }
    } catch (err) {
        console.log(`Database failure when creating new collab! ${err}`);
    }
}

//pop and return the entry from database with username ${username}
export async function deleteCollabForUser(username) {
    try {
        const obj = await _deleteCollabForUser(username);
        console.log(`deleted entry with username of: ${username}.`)
        return obj;
    } catch (err) {
        console.log(`Unable to delete collab for user: ${username}!`);
    }
}

export async function getUserDetails(username) {
    try {
        const obj = await _getUserDetails(username);
        if (obj) {
            return obj
        } else {
            return null
        }
    } catch (err) {
        console.log(`Faced an error finding a collab for user: ${username}!`);
    }
}
