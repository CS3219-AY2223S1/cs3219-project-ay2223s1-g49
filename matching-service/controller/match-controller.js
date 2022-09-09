import { ormCreateMatch as _createMatch } from '../model/match-orm.js'

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
        
    } catch (err) {
        console.log(`Error getting a match for difficulty of ${difficulty}`);
    }
}

//pop and return the entry from database with username ${username}
export async function removeMatchForUser(username) {
    try {
        
    } catch (err) {
        console.log(`Unable to remove match for user: ${username}!`);
    }
}