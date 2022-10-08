import { authUser, checkUser, createUser, blacklistToken, getBlacklistedToken, deleteUser, changePassword } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
  try {
    const newUser = await createUser({ username, password});

    await newUser.save();

    const resp = {
      err: null,
      message: `Created new user ${username} successfully!`,
    };
    return resp;

  } catch (err) {
    const resp = {
      err: err,
      message: "Unknown error occured in ormCreateUser",
    };
    return resp;

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

export async function ormBlacklistToken(params){
    try{
        const token = await blacklistToken(params)
        await token.save()

        const resp = {
            err: null,
            message: `Token blacklisted!`,
          };
      
          return resp;

    } catch (err) {
        return {err}
    }
}

export async function ormGetBlacklistToken(_token){
    try {
        const token = await getBlacklistedToken(_token)
        return token ? false : true;
    } catch (err) {
        return { err }
    }
}

export async function ormDeleteUser(username) {
  try {
    console.log(`Attempting to delete account ${username} ...`)
    const checkRes = await deleteUser(username);
    return checkRes;

  } catch (err){
    console.log(`Error occured when deleting user! Username: ${username}`)
    return { err }

  }
}

export async function ormChangePassword(username, newPassword){
  
  try{
    // Sanity check for user existence
    const userExist = await ormCheckUser(username);
    if (userExist.err || !userExist){
      const err = 'User does not exist!'
      return { err }
    }

    // User exists
    const changePwReq = await changePassword(username,newPassword);
    return changePwReq;

  } catch (err) {
    return {err}
  }
}

