import { createUser } from "./repository.js";

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
