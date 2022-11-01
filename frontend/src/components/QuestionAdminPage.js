import { Button, Grid, Tab, Tabs, TextField } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import makeStyles from "@mui/styles/makeStyles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    edit: {
        "&:hover": {
            backgroundColor: "#DADADA",
        },
    },
});

function QuestionAdminPage(props) {
    const [difficulty, setDifficulty] = useState();
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [editMode, setEditMode] = useState({
        current: 0,
        create: true,
        edit: false,
    });
    const [questionList, setQuestionList] = useState([
        {
            _id: "63610e7bc1ee88fecc8f76ba",
            difficulty: "hard",
            content: " cool  ",
            __v: 0,
        },
        {
            _id: "63611037c4e7a180544bfe0d",
            difficulty: "hard",
            content: " cool2  ",
            __v: 0,
        },
        {
            _id: "6361103cc4e7a180544bfe0f",
            difficulty: "hard",
            content: " cool3  ",
            __v: 0,
        },
    ]);
    const [notificationStatus, setNotificationStatus] = useState({
        success: false,
        failure: false,
    });

    const classes = useStyles();
    const clearInput = () => {
        setDifficulty("");
        setQuestion("");
        setAnswer("");
    };

    return (
        <Grid container direction="row">
            <Grid id="left" item xs={6} p={6}>
                <Tabs
                    value={editMode.current}
                    onChange={(event, newValue) => {
                        setEditMode({
                            current: newValue,
                            ...editMode.create,
                            ...editMode.edit,
                        });
                        console.log(editMode);
                    }}
                >
                    <Tab value={0} label="Create">
                        <p>Create</p>
                    </Tab>
                    <Tab value={1} label="Edit" disabled={!editMode.edit}>
                        <p>Edit</p>
                    </Tab>
                </Tabs>
                <div className="my-5">
                    <div>Difficulty</div>
                    <TextField
                        value={difficulty}
                        placeholder="Difficulty level"
                        variant="filled"
                        onChange={(e) => setDifficulty(e.target.value)}
                    ></TextField>
                </div>
                <div className="my-5">
                    <div>Question</div>
                    <TextField
                        multiline
                        rows={5}
                        value={question}
                        fullWidth
                        placeholder="The content of the question"
                        variant="filled"
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <div>Answer</div>

                    <TextField
                        multiline
                        rows={5}
                        value={answer}
                        fullWidth
                        placeholder="The suggested solution to the question"
                        variant="filled"
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
                <Button
                    color="primary"
                    onClick={() => {
                        axios
                            .create()
                            .post(
                                "http://localhost:7000/service/create/question",
                                {
                                    difficulty: difficulty,
                                    content: question,
                                    answer: answer,
                                }
                            )
                            .then((res) => {
                                if (res.status === 200) {
                                    setNotificationStatus({
                                        ...notificationStatus,
                                        success: true,
                                    });
                                    clearInput();
                                }
                            })
                            .catch(() => {
                                setNotificationStatus({
                                    ...notificationStatus,
                                    failure: true,
                                });
                            });
                    }}
                >
                    Create
                </Button>
                <Button color="secondary" onClick={clearInput}>
                    Clear
                </Button>
                <Button
                    variant="contained"
                    onClick={props.handleLogout}
                    component={Link}
                    to="/mainpage"
                >
                    LOGOUT
                </Button>
            </Grid>
            <Grid id="right" item xs={6} p={6}>
                {questionList.map((item, idx) => (
                    <Grid
                        direction="row"
                        container
                        sx={{
                            my: 5,
                            border: 1,
                            maxHeight: "80vh",
                            overflow: "auto",
                        }}
                    >
                        <Grid item xs={5}>
                            {item._id}
                        </Grid>
                        <Grid item xs={6}>
                            {item.difficulty}
                        </Grid>
                        <Grid item xs={1}>
                            <div
                                className={classes.edit}
                                style={{
                                    textAlign: "center",
                                    borderRadius: "50px",
                                }}
                            >
                                <DeleteIcon
                                    sx={{
                                        transform: "scale(1.2)",
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            {item.content}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                open={notificationStatus.success}
                autoHideDuration={5000}
                onClose={() => {
                    setNotificationStatus({
                        ...notificationStatus,
                        success: false,
                    });
                }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity="success"
                    onClose={() => {
                        setNotificationStatus({
                            ...notificationStatus,
                            success: false,
                        });
                    }}
                >
                    Question created succesfully!
                </Alert>
            </Snackbar>
            <Snackbar
                open={notificationStatus.failure}
                autoHideDuration={5000}
                onClose={() => {
                    setNotificationStatus({
                        ...notificationStatus,
                        failure: false,
                    });
                }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity="error"
                    onClose={() => {
                        setNotificationStatus({
                            ...notificationStatus,
                            failure: false,
                        });
                    }}
                >
                    Error when creating question!
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default QuestionAdminPage;
