import {
    createQuestion,
    deleteQuestion,
    getDifficultyLimit,
    getRandomId,
    getQuestionContent,
} from "./repository.js";

function createErrResponse(err, method) {
    const message = `Error occured in ${method}: ${err.message}`;
    console.log(message);
    const resp = {
        err: err,
        message: message,
    };
    return resp;
}

export async function ormCreateQuestion(difficulty, content) {
    try {
        const newQuestion = await createQuestion({ difficulty, content });

        await newQuestion.save();

        const resp = {
            err: null,
            message: `Created question successfully!`,
        };
        return resp;
    } catch (err) {
        return createErrResponse(err, "ormCreateQuestion");
    }
}

export async function ormDeleteQuestion(id) {
    try {
        const res = await deleteQuestion(id);
        let response;
        if (res.err)
            response = {
                err: res.err,
                message: "Failed to delete question!",
            };
        else response = { message: `Successfully deleted question ${id}` };
        return response;
    } catch (err) {
        return createErrResponse(err, "ormDeleteQuestion");
    }
}

export async function ormGetDifficultyLimit(difficulty) {
    try {
        const maxQuestion = await getDifficultyLimit(difficulty);
        return maxQuestion;
    } catch (err) {
        return createErrResponse(err, "ormGetDifficultyLimit");
    }
}

export async function ormGetRandomId(difficulty) {
    try {
        const questionId = await getRandomId(difficulty);
        return questionId;
    } catch (err) {
        return createErrResponse(err, "ormGetRandomId");
    }
}

export async function ormGetQuestionContent(id) {
    try {
        const content = await getQuestionContent(id);
        return content;
    } catch (err) {
        return createErrResponse(err, "ormGetQuestionContent");
    }
}
