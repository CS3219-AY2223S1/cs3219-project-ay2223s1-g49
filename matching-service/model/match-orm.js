import { createMatch } from './repository.js';

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

