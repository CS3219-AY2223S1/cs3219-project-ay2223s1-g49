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
        if (!req.body.difficulty) missingParam.push("difficulty");
        if (!req.body.content) missingParam.push("content");

        if (missingParam.length != 0) {
            const message = createMissingParamError(missingParam.join(", "));
            return res.status(500).json({ message: message });
        }

        const resp = ormCreateQuestion(req.body.difficulty, req.body.content);
        return res
            .status(200)
            .json({ message: "Question created successfully!" });
    } catch (err) {
        return res.status(500).json({
            message: `Create question failed with error: ${err.message}`,
        });
    }
}

export async function deleteQuestion(req, res) {
    try {
        if (!req.body.id) {
            const message = createMissingParamError("id");
            return res.status(500).json({ message: message });
        }
        const resp = await ormDeleteQuestion(req.body.id);
        if (resp.err) throw Error(resp.err);
        return res
            .status(200)
            .json({ message: "Question deleted successfully!" });
    } catch (err) {
        return res.status(500).json({
            message: `Delete question failed with error: ${err.message}`,
        });
    }
}

export async function getLimit(req, res) {
    try {
        if (!req.body.difficulty) {
            const message = createMissingParamError("difficulty");
            return res.status(500).json({ message: message });
        }
        const limit = await ormGetDifficultyLimit(req.body.difficulty);
        return res.status(200).json({ limit: limit });
    } catch (err) {
        return res.status(500).json({
            message: `Get question limit failed with error:${err.message}`,
        });
    }
}

export async function getRandomId(req, res) {
    try {
        if (!req.body.difficulty) {
            const message = createMissingParamError("difficulty");
            return res.status(500).json({ message: message });
        }
        const _id = await ormGetRandomId(req.body.difficulty);
        if (_id == "No questions available")
            return res.status(500).json({
                message: "Chosen difficulty has no questions available",
            });
        return res.status(200).json({ id: _id });
    } catch (err) {
        return res.status(500).json({
            message: `Get random question id failed with error:${err.message}`,
        });
    }
}

export async function getQuestionContent(req, res) {
    try {
        if (!req.body.id) {
            const message = createMissingParamError("id");
            return res.status(500).json({ message: message });
        }
        const _content = await ormGetQuestionContent(req.body.id);
        return res.status(200).json({ content: _content });
    } catch (err) {
        return res.status(500).json({
            message: `Get question content failed with error:${err.message}`,
        });
    }
}
