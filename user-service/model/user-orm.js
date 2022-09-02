import { createUser, checkUser } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
  try {
    const newUser = await createUser({ username, password });
    await newUser.save();

    const resp = {
      err: null,
      message: `Created new user ${username} successfully!`,
    };

    return resp;
  } catch (err) {
    let logMessage;
    let resp;

    if (err && err.code === 11000) {
      //duplicate key
      logMessage = `Username ${username} has been used!`;
      resp = {
        err: err,
        message: logMessage,
      };
    }

    console.log(logMessage);
    return resp;

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
