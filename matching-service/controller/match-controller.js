import { ormCreateMatch as _createMatch } from '../model/match-orm.js'
import { ormGetMatchForDifficulty as _getMatchForDifficulty } from '../model/match-orm.js'
import { ormDeleteMatchForUser as _deleteMatchForUser} from '../model/match-orm.js'
import { v4 as uuidv4 } from 'uuid'

// message is a json object containing a username and difficulty field.
export async function createMatch(message, roomId) {
    try {
        const username = message.username;
        const difficulty = message.difficulty;
        console.log(`Recieved username of: ${username} and difficulty of: ${difficulty}`)
        if (username && difficulty) {
            const resp = await _createMatch(username, difficulty, roomId);
            console.log(resp);
            if (resp.err) {
                console.log(`Could not create a match for ${username} with difficulty of ${difficulty}!`)
            } else {
                console.log(`Created new match for ${username} with difficulty of ${difficulty} successfully!`)
            }
        } else {
            console.log(`Username and/or difficulty are missing!`)
        }
    } catch (err) {
        console.log(`Database failure when creating new  match!`);
    }
}

//find if match with difficulty of ${difficulty} return username if exists and null otherwise
export async function getMatchForDifficulty(difficulty) {
    try {
        const obj = await _getMatchForDifficulty(difficulty);
        console.log(obj)
        return obj
    } catch (err) {
        console.log(`Error getting a match for difficulty of ${difficulty}`);
    }
}

//pop and return the entry from database with username ${username}
export async function deleteMatchForUser(username) {
    try {
        const obj = await _deleteMatchForUser(username);
        console.log(`deleted entry with username of: ${username}.`)
        return obj;
    } catch (err) {
        console.log(`Unable to delete match for user: ${username}!`);
    }
}

export async function attemptJoinMatch(message, socket) {
    try {
        const userMatch = await getMatchForDifficulty(message.difficulty);
        if (userMatch) {
            console.log(`Found user ${userMatch.username} with difficulty of : ${message.difficulty}`);
            await deleteMatchForUser(userMatch.username);
            await deleteMatchForUser(message.username);
            socket.emit(`matchSuccess`, socket.id, userMatch.roomId, uuidv4());
            console.log(`emiteeeeeeeeeeee `)
            console.log(uuidv4())
        } else {
            console.log(`There is currently no users in the database with difficulty of: ${difficulty}`);
        }
    } catch (err) {
        console.log(err)
        console.log(`Unexpected error when joining match!`);
    }
}