import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./middleware.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

import {
    getLimit,
    getRandomId,
    getQuestionContent,
    createQuestion,
    deleteQuestion,
} from "./controller/question-controller.js";

const  routes = express.Router();

routes.get("/", (_, res) =>
    res.send(`Server live at ${new Date().toUTCString()}`)
);
routes.post("/create/question", auth, createQuestion);
routes.post("/delete/question", deleteQuestion);
routes.post("/get/limit", getLimit);
routes.post("/get/random-id", getRandomId);
routes.post("/get/question-content", getQuestionContent);

export default routes;
