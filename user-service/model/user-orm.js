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
    try{
        console.log(`Attempting to authenticate ${username} ...`)
        const authSuccess = await authUser(username, password)
        return authSuccess;
    } catch (err) {
        console.log(`Error occured during authentication attempt! Username: ${username}`)
        return { err };
    }
}

export async function ormCheckUser(username) {
    try{
        console.log(`Checking if ${username} exists ...`)
        const checkRes = await checkUser(username);
        return checkRes;
    } catch (err){
        console.log(`Error occured during user check! Username: ${username}`)
        return { err }
    }
}
