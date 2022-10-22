import QuestionModel from "./question-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
    process.env.ENV == "PROD"
        ? process.env.DB_CLOUD_URI_PROD
        : process.env.DB_CLOUD_URI_TEST;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createQuestion(params) {
    return new QuestionModel(params);
}

export async function deleteQuestion(_id) {
    let resp = false;
    const query = QuestionModel.findByIdAndDelete(_id).exec();
    await query.then(function (res) {
        if (!res) throw Error("Question not found in database");
        else resp = true;
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
    const query = QuestionModel.aggregate([
        { $match: { difficulty: _difficulty } },
        { $sample: { size: 1 } },
    ]).exec();
    await query.then(function (question) {
        if (question.length == 0) throw Error("No questions available");
        else id = question[0]._id.toString();
    });
    return id;
}

export async function getQuestionContent(id) {
    let content = null;
    const query = QuestionModel.findById(id).exec();
    await query.then(function (question) {
        if (!question) throw Error("Question id not found in database");
        content = question.content;
    });

    return content;
}
