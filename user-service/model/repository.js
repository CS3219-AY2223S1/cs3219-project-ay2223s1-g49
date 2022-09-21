import  UserModel  from './user-model.js';
import  TokenModel from './token-model.js'
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';
import { json } from 'express';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
  return new UserModel(params);
}

export async function checkUser(_username) {

    var res = false;

    const query = UserModel.find({username: _username }).exec()
    await query.then( function(users) {
        if (users)  res = users.length > 0
    })

    return res;
}

export async function authUser(_username, _password) {
    var res = false

    const query = UserModel.find({ username: _username }).exec()
    await query.then( function(users) {
      if (users && users.length > 0) {
        res = (_password == users[0].password)
      }
    })

    return res;
}

export async function blacklistToken(params) {
    return new TokenModel(params)
}

export async function getBlacklistedToken(_token) {
    var res = null;
    const query = TokenModel.find({ token: _token }).exec()
    await query.then(function(tokens) {
        if (tokens && tokens.length > 0){
            res = tokens[0]
        }
    })

    return res;
}

export async function getUserSalt(_username) {
  var res = null;
  const query = UserModel.find({ username: _username }).exec()
  await query.then(function(user) {
      if (user && user.length === 0){
          res = user[0].salt
      }
  })

  return res;
}
