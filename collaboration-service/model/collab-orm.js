import { createCollab, deleteCollabForUser } from './repository.js';

export async function ormCreateCollab(username, difficulty, roomId) {
    try {
        const newCollab = await createCollab({username, difficulty, roomId});
        newCollab.save()
        return true
    } catch (err) {
        console.log('ERROR: Could not create new collab')
        return { err }
    }
}

export async function ormDeleteCollabForUser(username) {
    try {
        deleteCollabForUser(username);
        return true
    } catch (err) {
        console.log(`ERROR: Could not delete collab for user: ${username}`)
        return { err }
    }
}