import { authUser, checkUser, createUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({username, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormAuthUser(username, password) {
    console.log(`Attempting to authenticate ${username}`)
    return await authUser(username, password);
}

export async function ormCheckUser(username) {
    return await checkUser(username);
}

