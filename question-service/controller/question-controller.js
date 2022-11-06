import {
    ormCreateQuestion,
    ormDeleteQuestion,
    ormGetDifficultyLimit,
    ormGetQuestionContent,
    ormGetRandomId,
    ormGetQuestionAnswer,
    ormGetAllQuestions,
} from "../model/question-orm.js";

function createMissingParamError(param) {
    return `Missing param detected: ${param}`;
}

export async function createQuestion(req, res) {
    try {
        const missingParam = [];
        if (!req.body.difficulty || req.body.difficulty.trim().length == 0)
            missingParam.push("difficulty");
        if (!req.body.title || req.body.title.trim().length == 0)
            missingParam.push("title");
        if (!req.body.content || req.body.content.trim().length == 0)
            missingParam.push("content");
        if (!req.body.answer || req.body.answer.trim().length == 0)
            missingParam.push("answer");

        if (missingParam.length != 0) {
            const message = createMissingParamError(missingParam.join(", "));
            return res.status(500).json({ Error: message });
        }

        const resp = await ormCreateQuestion(
            req.body.difficulty,
            req.body.title,
            req.body.content,
            req.body.answer
        );

        if (resp.err) throw Error(resp.err);
        return res.status(200).json({ message: resp.message });
    } catch (err) {
        return res.status(500).json({
            Error: `Create question failed with error: ${err.message}`,
        });
    }
}

export async function deleteQuestion(req, res) {
    try {
        if (!req.body.id) {
            const message = createMissingParamError("id");
            return res.status(500).json({ Error: message });
        }

        const resp = await ormDeleteQuestion(req.body.id);
        if (resp.err) throw Error(resp.err);
        return res.status(200).json({ message: resp.message });
    } catch (err) {
        return res.status(500).json({
            Error: `Delete question failed with error: ${err.message}`,
        });
    }
}

export async function getLimit(req, res) {
    try {
        if (!req.body.difficulty) {
            const message = createMissingParamError("difficulty");
            return res.status(500).json({ Error: message });
        }

        const resp = await ormGetDifficultyLimit(req.body.difficulty);
        if (resp.err) throw Error(resp.err);
        return res.status(200).json({ limit: resp.limit });
    } catch (err) {
        return res.status(500).json({
            Error: `Get question limit failed with error: ${err.message}`,
        });
    }
}

export async function getRandomId(req, res) {
    try {
        if (!req.body.difficulty) {
            const message = createMissingParamError("difficulty");
            return res.status(500).json({ Error: message });
        }

        const resp = await ormGetRandomId(req.body.difficulty);
        if (resp.err) throw Error(resp.err);
        return res.status(200).json({ id: resp.id });
    } catch (err) {
        return res.status(500).json({
            Error: `Get random question id failed with error: ${err.message}`,
        });
    }
}

export async function getQuestionContent(req, res) {
    try {
        if (!req.body.id) {
            const message = createMissingParamError("id");
            return res.status(500).json({ Error: message });
        }

        const resp = await ormGetQuestionContent(req.body.id);
        if (resp.err) throw Error(resp.err);
        return res.status(200).json({ question: resp.content });
    } catch (err) {
        return res.status(500).json({
            Error: `Get question content failed with error: ${err.message}`,
        });
    }
}

export async function getQuestionAnswer(req, res) {
    try {
        if (!req.body.id) {
            const message = createMissingParamError("id");
            return res.status(500).json({ Error: message });
        }

        const resp = await ormGetQuestionAnswer(req.body.id);
        if (resp.err) throw Error(resp.err);
        return res.status(200).json({ answer: resp.answer });
    } catch (err) {
        return res.status(500).json({
            Error: `Get question answer failed with error: ${err.message}`,
        });
    }
}

export async function getAllQuestions(req, res) {
    try {
        const resp = await ormGetAllQuestions();
        if (resp.err) throw Error(resp.err);
        return res.status(200).json({ questions: resp.questions });
    } catch (err) {
        return res.status(500).json({
            Error: `Get all questions failed with error: ${err.message}`,
        });
    }
}
