import {
    ormCreateQuestion,
    ormDeleteQuestion,
    ormGetDifficultyLimit,
    ormGetQuestionContent,
    ormGetRandomId,
} from "../model/question-orm.js";

function createMissingParamError(param) {
    return `Missing param detected: ${param}`;
}

export async function createQuestion(req, res) {
    try {
        const missingParam = [];
        if (!req.body.difficulty || req.body.difficulty.trim().length == 0)
            missingParam.push("difficulty");
        if (!req.body.content || req.body.content.trim().length == 0)
            missingParam.push("content");

        if (missingParam.length != 0) {
            const message = createMissingParamError(missingParam.join(", "));
            return res.status(500).json({ Error: message });
        }

        const resp = await ormCreateQuestion(
            req.body.difficulty,
            req.body.content
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
        return res.status(200).json({ content: resp.content });
    } catch (err) {
        return res.status(500).json({
            Error: `Get question content failed with error: ${err.message}`,
        });
    }
}
