import { createUser } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
  try {
    const newUser = await createUser({ username, password });
    await newUser.save();
    return {
      err: null,
      message: `Created new user ${username} successfully!`,
    };
  } catch (err) {
    let logMessage;

    if (err && err.code === 11000) {
      //duplicate key
      logMessage = `Username ${username} has been used!`;
    }

    console.log(logMessage);

    return {
      err: err,
      message: logMessage,
    };
  }
}
