import { createPendingMatch } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreatePendingMatch(username, difficulty) {
    try {
        const newUser = await createPendingMatch({username, difficulty});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new pending match');
        return { err };
    }
}

