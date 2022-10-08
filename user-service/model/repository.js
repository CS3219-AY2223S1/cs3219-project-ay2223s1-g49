import  UserModel  from './user-model.js';
import  TokenModel from './token-model.js'
import {verifyPassword} from "../utils/hash-module.js"
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
  return new UserModel(params);
}

export async function checkUser(_username) {

  let res = false;

  const query = UserModel.find({username: _username }).exec()
  await query.then( function(users) {
      if (users)  res = users.length > 0
  })

  return res;
}

export async function authUser(_username, _password) {
    let res = false

    const query = UserModel.find({ username: _username }).exec()
    await query.then( function(users) {
      if (users && users.length > 0) {
        res = verifyPassword(_password, users[0].password);
      }
    })

    return res;
}

export async function blacklistToken(params) {
    return new TokenModel(params)
}

export async function getBlacklistedToken(_token) {
    let res = null;
    const query = TokenModel.find({ token: _token }).exec()
    await query.then(function(tokens) {
        if (tokens && tokens.length > 0){
            res = tokens[0]
        }
    })

    return res;
}

export async function deleteUser(_username) {

  let res = false;

  const request = UserModel.findOneAndDelete({username:_username}).exec()
  await request.then( function (user, err) {
    if (err) {
      console.log("Error in deleteUser")
    } else {
      console.log("Deleted User : ", user);
      res = true;
    }
  })
  return res
}

export async function changePassword(_username,_newPassword){
  let res = false;

  const req = UserModel.findOneAndUpdate({username:_username,password:_newPassword});
  await req.then((user,err)=>{
    if (err) console.log('unable to change password')
    else {
      console.log(`password changed for ${_username}`)
      res = true;
    }
  })

  return res;
}
