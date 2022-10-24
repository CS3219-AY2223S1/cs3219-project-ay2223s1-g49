import MatchModel from './match-model.js';
import dotenv from 'dotenv';

//Set up mongoose connection
import mongoose from 'mongoose';

dotenv.config();

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createMatch(params) { 
  return new MatchModel(params)
}

export async function getDifficultyForUser(param) {
  const query = MatchModel.findOne({"difficulty" : param}).exec();
  var matchedUser = null;
  await query.then( (matched) => {
    matchedUser = matched;
  })
  return matchedUser;
}

export async function deleteMatchForUser(param) {
  const query = MatchModel.findOneAndDelete({"username" : param}).exec();
  var matchedUser = null;
  await query.then( (matched) => {
    matchedUser = matched;
  })
  return matchedUser;
}

export async function getUserDetails(param) {
  const query = MatchModel.fineOne({"username" : param}).exec();
  var matchedUser = null;
  await query.then( (matched) => {
    matchedUser = matched;
  })
  return matchedUser;
}