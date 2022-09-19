import { createUser, checkUser, deleteUser } from "./repository.js";
import bcrypt from 'bcrypt'

//need to separate orm functions from repository to decouple business logic from persistence
async function ormCreateUser(username, unhashedPassword) {
  try {
    const salt  = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(unhashedPassword, salt)
    const newUser = await createUser({ username, password, salt });

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

async function ormCheckUser(username) {
  try{
      console.log(`Checking if ${username} exists ...`)
      const checkRes = await checkUser(username);
      return checkRes;

  } catch (err){
      console.log(`Error occured during user check! Username: ${username}`)
      return { err }

  }
}

async function ormDeleteUser(username) {
  try {
    console.log(`Attempting to delete account ${username} ...`)
    const checkRes = await deleteUser(username);
    return checkRes;

  } catch (err){
    console.log(`Error occured when deleting user! Username: ${username}`)
    return { err }

  }
}

export {ormCreateUser, ormCheckUser, ormDeleteUser}