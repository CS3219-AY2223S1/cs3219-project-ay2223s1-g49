// Mocha/Chai/App imports
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index.js";
const { expect } = chai;
chai.use(chaiHttp);

// Test using direct connection to MongoDB
import mongoose from "mongoose";
import QuestionModel from "../model/question-model.js";
let mongoDB = process.env.DB_CLOUD_URI_TEST;
if (!mongoDB || mongoDB == "" || process.env.ENV != "TEST") process.exit(1);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Import Utils
import { auth } from "../middleware.js";

// Define environment variables
const SECRET_KEY = process.env.JWT_TEST_KEY;

/*
routes.post("/get/question-content", allow, getQuestionContent);
routes.post("/get/question-answer", allow, getQuestionAnswer);
*/

describe("Test create questions", () => {
    const URL = "/service/create/question";
    it("Should be blocked", (done) => {
        const VALID_DIFFICULTY = "easy";
        const VALID_CONTENT = "Lorem Ipsum";
        const VALID_ANSWER =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        const VALID_PAYLOAD = {
            difficulty: VALID_DIFFICULTY,
            content: VALID_CONTENT,
            answer: VALID_ANSWER,
        };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });
});

describe("Test delete questions", () => {
    const URL = "/service/delete/question";
    it("Should be blocked", (done) => {
        // TODO
        const VALID_ID = "635660ce303d5e23e512580e";
        const VALID_PAYLOAD = { id: VALID_ID };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });
});

describe("Test questions limit", () => {
    const URL = "/service/get/limit";
    before(async () => {
        // Clear DB and insert test user
        await QuestionModel.deleteMany({});
        const hardQuestion = QuestionModel({
            difficulty: "hard",
            content: "  cool  ",
            answer: "this is answer",
        });
        await hardQuestion.save();
        const easyQuestion1 = QuestionModel({
            difficulty: "easy",
            content: "  cool1  ",
            answer: "this is answer",
        });
        await easyQuestion1.save();
        const easyQuestion2 = QuestionModel({
            difficulty: "easy",
            content: "  cool2  ",
            answer: "this is answer",
        });
        await easyQuestion2.save();
    });

    after(async () => {
        // Clear DB
        await QuestionModel.deleteMany({});
    });

    it("Should return 1", (done) => {
        // TODO
        const VALID_DIFFICULTY = "hard";
        const VALID_PAYLOAD = { difficulty: VALID_DIFFICULTY };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(res.body.limit).to.equal(1);
                done();
            });
    });

    it("Should return 2", (done) => {
        const VALID_DIFFICULTY = "easy";
        const VALID_PAYLOAD = { difficulty: VALID_DIFFICULTY };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(res.body.limit).to.equal(2);
                done();
            });
    });

    it("Should return 0", (done) => {
        const VALID_DIFFICULTY = "undef";
        const VALID_PAYLOAD = { difficulty: VALID_DIFFICULTY };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(res.body.limit).to.equal(0);
                done();
            });
    });
});

describe("Test quesions random id", () => {
    const URL = "/service/get/random-id";
    var hardQuestionIdSet;
    var easyQuestionIdSet;
    before(async () => {
        // Clear DB and insert test user
        await QuestionModel.deleteMany({});
        const hardQuestion = QuestionModel({
            difficulty: "hard",
            content: "  cool  ",
            answer: "this is answer",
        });
        await hardQuestion.save();
        const easyQuestion1 = QuestionModel({
            difficulty: "easy",
            content: "  cool1  ",
            answer: "this is answer",
        });
        await easyQuestion1.save();
        const easyQuestion2 = QuestionModel({
            difficulty: "easy",
            content: "  cool2  ",
            answer: "this is answer",
        });
        await easyQuestion2.save();

        hardQuestionIdSet = (
            await QuestionModel.find({ difficulty: "hard" })
        ).map((doc) => doc.id);
        easyQuestionIdSet = (
            await QuestionModel.find({ difficulty: "easy" })
        ).map((doc) => doc.id);
    });

    after(async () => {
        // Clear DB
        await QuestionModel.deleteMany({});
    });

    it("Should return a valid hard question id", (done) => {
        const VALID_DIFFICULTY = "hard";
        const VALID_PAYLOAD = { difficulty: VALID_DIFFICULTY };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(hardQuestionIdSet).to.include(res.body.id);
                done();
            });
    });

    it("Should return a valid easy question id", (done) => {
        const VALID_DIFFICULTY = "easy";
        const VALID_PAYLOAD = { difficulty: VALID_DIFFICULTY };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(easyQuestionIdSet).to.include(res.body.id);
                done();
            });
    });

    it("No questions of this diffuclty, should return a error ", (done) => {
        const VALID_DIFFICULTY = "undef";
        const VALID_PAYLOAD = { difficulty: VALID_DIFFICULTY };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });
});

describe("Test quesions random id", () => {
    const URL = "/service/get/question-content";
    const questionContent = "  cool  ";
    var questionID;
    before(async () => {
        // Clear DB and insert test user
        await QuestionModel.deleteMany({});
        const hardQuestion = QuestionModel({
            difficulty: "hard",
            content: questionContent,
            answer: "this is answer",
        });
        await hardQuestion.save();

        questionID = (await QuestionModel.find({ difficulty: "hard" })).map(
            (doc) => doc.id
        )[0];
    });

    after(async () => {
        // Clear DB
        await QuestionModel.deleteMany({});
    });

    it("Should return a valid hard question content", (done) => {
        const VALID_PAYLOAD = { id: questionID };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(res.body.content).to.equal(questionContent);
                done();
            });
    });

    it("Invalid question id, should return a error ", (done) => {
        const INVALID_PAYLOAD = { id: 1122334455 };
        chai.request(app)
            .post(URL)
            .send(INVALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });
});

describe("Test quesions random id", () => {
    const URL = "/service/get/question-answer";
    const questionContent = "  cool  ";
    const questionAnswer = "this is answer";
    var questionID;
    before(async () => {
        // Clear DB and insert test user
        await QuestionModel.deleteMany({});
        const hardQuestion = QuestionModel({
            difficulty: "hard",
            content: questionContent,
            answer: questionAnswer,
        });
        await hardQuestion.save();

        questionID = (await QuestionModel.find({ difficulty: "hard" })).map(
            (doc) => doc.id
        )[0];
    });

    after(async () => {
        // Clear DB
        await QuestionModel.deleteMany({});
    });

    it("Should return a valid hard question content", (done) => {
        const VALID_PAYLOAD = { id: questionID };
        chai.request(app)
            .post(URL)
            .send(VALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(res.body.answer).to.equal(questionAnswer);
                done();
            });
    });

    it("Invalid question id, should return a error ", (done) => {
        const INVALID_PAYLOAD = { id: 1122334455 };
        chai.request(app)
            .post(URL)
            .send(INVALID_PAYLOAD)
            .end((req, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });
});

describe("Test get all questions", () => {
    const URL = "/service/get/all-questions";
    const questionContent = "  cool  ";
    const questionAnswer = "this is answer";
    var questionID;
    before(async () => {
        // Clear DB and insert test user
        await QuestionModel.deleteMany({});
        const hardQuestion = QuestionModel({
            difficulty: "hard",
            content: questionContent,
            answer: questionAnswer,
        });
        await hardQuestion.save();

        questionID = (await QuestionModel.find({ difficulty: "hard" })).map(
            (doc) => doc.id
        )[0];
    });

    after(async () => {
        // Clear DB
        await QuestionModel.deleteMany({});
    });

    it("Should return an array of 1 question", (done) => {
        chai.request(app)
            .post(URL)
            .end((req, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });
});
