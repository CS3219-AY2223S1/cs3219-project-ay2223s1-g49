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
        return createErrResponse(err.message, "ormCreateQuestion");
    }
}

export async function ormDeleteQuestion(id) {
    try {
        const message = await deleteQuestion(id);
        const resp = {
            err: null,
            limit: message,
        };
        return resp;
    } catch (err) {
        return createErrResponse(err.message, "ormDeleteQuestion");
    }
}

export async function ormGetDifficultyLimit(difficulty) {
    try {
        const maxQuestion = await getDifficultyLimit(difficulty);
        const resp = {
            err: null,
            limit: maxQuestion,
        };
        return resp;
    } catch (err) {
        return createErrResponse(err.message, "ormGetDifficultyLimit");
    }
}

export async function ormGetRandomId(difficulty) {
    try {
        const questionId = await getRandomId(difficulty);
        const resp = {
            err: null,
            id: questionId,
        };
        return resp;
    } catch (err) {
        return createErrResponse(err.message, "ormGetRandomId");
    }
}

export async function ormGetQuestionContent(id) {
    try {
        const content = await getQuestionContent(id);
        const resp = {
            err: null,
            content: content,
        };
        return resp;
    } catch (err) {
        return createErrResponse(err.message, "ormGetQuestionContent");
    }
}
