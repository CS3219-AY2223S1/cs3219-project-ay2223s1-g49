import UserModel from './user-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';
import { authUser } from '../controller/user-controller.js';
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