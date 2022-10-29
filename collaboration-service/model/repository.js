import CollabModel from './collab-model.js'
import dotenv from 'dotenv'

//Set up mongoose connection
import mongoose from 'mongoose'

dotenv.config();

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI_PROD : process.env.DB_CLOUD_URI_TEST;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export async function createCollab(params) { 
  return new CollabModel(params)
}

export async function deleteCollabForUser(param) {
  CollabModel.findOneAndDelete({"username" : param}).exec()
  await query.then((matched) => {
    if (matched) {
      console.log(`Deleted user ${username} in the collab db`)
    } else {
      console.log(`user ${username} could not be found/deleted in the collab db`)
    }
  })
}

export async function getUserDetails(param) {
  CollabModel.findOne({"username" : param}).exec()
  await query.then((matched) => {
    if (matched) {
      return matched
    } else {
      console.log(`user ${username} could not be found in the collab db`)
      return null
    }
  })
}