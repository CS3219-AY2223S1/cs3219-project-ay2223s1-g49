import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
import cookieParser from "cookie-parser";

// Controller will contain all the User-defined Routes
app.use("/service", routes).all((_, res) => {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(7000, () => console.log("question-service listening on port 7000"));

export default app;
