import QuestionModel from "./question-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
    process.env.ENV == "PROD"
        ? process.env.DB_CLOUD_URI
        : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createQuestion(params) {
    return new QuestionModel(params);
}

export async function deleteQuestion(_id) {
    let resp = null;
    const query = QuestionModel.findByIdAndDelete(_id).exec();
    await query.then(function (res) {
        if (!res)
            resp = { err: "Question not found in database", success: false };
        else resp = { success: true };
    });

    return resp;
}

export async function getDifficultyLimit(_difficulty) {
    let limit = null;
    const query = QuestionModel.countDocuments({
        difficulty: _difficulty,
    }).exec();
    await query.then(function (count) {
        limit = count;
    });

    return limit;
}

export async function getRandomId(_difficulty) {
    let id = null;
    const query = QuestionModel.aggregate(
        [{ $match: { difficulty: _difficulty } }, { $sample: { size: 1 } }],
        {
            _id: {
                $toString: "$_id",
            },
        }
    ).exec();
    await query.then(function (question) {
        if (question.length == 0) {
            id = "No questions available";
        } else {
            id = question[0]._id.toString();
        }
    });
    return id;
}

export async function getQuestionContent(id) {
    let content = null;
    const query = QuestionModel.findById(id).exec();
    await query.then(function (question) {
        content = question.content;
    });

    return content;
}
