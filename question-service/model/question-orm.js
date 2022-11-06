import {
    createQuestion,
    deleteQuestion,
    getDifficultyLimit,
    getRandomId,
    getQuestionContent,
    getQuestionAnswer,
    getAllQuestions,
} from "./repository.js";

function createErrResponse(err, method) {
    const message = `Error occured in ${method}: ${err.message}`;
    console.log(message);
    const resp = {
        err: message,
        message: null,
    };
    return resp;
}

export async function ormCreateQuestion(difficulty, title, content, answer) {
    try {
        const newQuestion = await createQuestion({
            difficulty,
            title,
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
        return createErrResponse(err, "ormCreateQuestion");
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
        return createErrResponse(err, "ormDeleteQuestion");
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
        return createErrResponse(err, "ormGetDifficultyLimit");
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
        if (err.message === "No questions available")
            return {
                err: "No question of this difficulty is available!",
                message: null,
            };
        return createErrResponse(err, "ormGetRandomId");
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
        return createErrResponse(err, "ormGetQuestionContent");
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
        return createErrResponse(err, "ormGetQuestionAnswer");
    }
}

export async function ormGetAllQuestions() {
    try {
        const allQuestions = await getAllQuestions();
        const resp = {
            err: null,
            questions: allQuestions,
        };
        return resp;
    } catch (err) {
        return createErrResponse(err, "ormGetAllQuestions");
    }
}
