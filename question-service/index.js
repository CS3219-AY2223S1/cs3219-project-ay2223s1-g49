import express from "express";
import cors from "cors";
import routes from "./routes.js";

const port = process.env.PORT || 7000

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
import cookieParser from "cookie-parser";

app.get("/", (_, res) =>
    res.send(`Server live at ${new Date().toUTCString()}`)
);

// Controller will contain all the User-defined Routes
app.use("/service", routes).all((_, res) => {
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.all('/', function (req, res) {
    res.status(405).json();
});



app.listen(port, () => console.log(`question-service listening on port ${port}`));

export default app;
