import {
    createQuestion,
    deleteQuestion,
    getDifficultyLimit,
    getRandomId,
    getQuestionContent,
    getQuestionAnswer,
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

export async function ormCreateQuestion(difficulty, content, answer) {
    try {
        const newQuestion = await createQuestion({
            difficulty,
            content,
            answer,
        });
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
        await deleteQuestion(id);
        const resp = {
            err: null,
            message: "Question deleted successfully!",
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

export async function ormGetQuestionAnswer(id) {
    try {
        const answer = await getQuestionAnswer(id);
        const resp = {
            err: null,
            answer: answer,
        };
        return resp;
    } catch (err) {
        return createErrResponse(err.message, "ormGetQuestionAnswer");
    }
}
