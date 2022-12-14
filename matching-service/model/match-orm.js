import { createMatch, getDifficultyForUser, deleteMatchForUser, getUserDetails } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateMatch(username, difficulty, roomId) {
    try {
        const newMatch = await createMatch({username, difficulty, roomId});
        newMatch.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new match');
        return { err };
    }
}

export async function ormGetMatchForDifficulty(difficulty) {
    try {
        const userNameFound = await getDifficultyForUser(difficulty);
        return userNameFound;
    } catch (err) {
        console.log(`ERROR: Could not get entry with difficulty of ${difficulty}`);
        return { err };
    }
}

export async function ormDeleteMatchForUser(username) {
    try {
        const deleted = deleteMatchForUser(username);
        return deleted;
    } catch (err) {
        console.log(`ERROR: Could not delete match for user: ${username}`);
        return { err };
    }
}

export async function ormGetUserDetails(user) {
    try {
        const userNameFound = await getUserDetails(user);
        return userNameFound;
    } catch (err) {
        console.log(`ERROR: Could not get entry with username of ${user}`);
        return { err };
    }
}
