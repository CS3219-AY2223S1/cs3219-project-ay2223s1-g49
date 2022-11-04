import { Button, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import makeStyles from "@mui/styles/makeStyles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import {
    URL_CREATE_QUESTION,
    URL_DELETE_QUESTION,
    URL_GET_ALL_QUESTIONS,
} from "../configs";

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
    const [questionList, setQuestionList] = useState([]);
    const [notificationStatus, setNotificationStatus] = useState({
        success: false,
        failure: false,
    });
    const [errorType, setErrorType] = useState("");

    // Initial loading of questions
    useEffect(() => {
        props
            .createAxiosHeader()
            .post(URL_GET_ALL_QUESTIONS)
            .then((resp) => {
                setQuestionList(resp.data.questions);
            })
            .catch((err) => {
                triggerError("Failed to get questions!");
            });
    }, []);

    const classes = useStyles();
    const clearInput = () => {
        setDifficulty("");
        setQuestion("");
        setAnswer("");
    };

    const triggerError = (type) => {
        setErrorType(type);
        setNotificationStatus({ ...notificationStatus, failure: true });
    };

    const refreshQuestionList = () => {
        props
            .createAxiosHeader()
            .post(URL_GET_ALL_QUESTIONS)
            .then((resp) => {
                setQuestionList(resp.data.questions);
            })
            .catch((err) => {
                triggerError("Failed to get questions!");
            });
    };

    const handleCreateQuestion = () => {
        props
            .createAxiosHeader()
            .post(URL_CREATE_QUESTION, {
                difficulty: difficulty,
                content: question,
                answer: answer,
            })
            .then((res) => {
                if (res.status === 200) {
                    setNotificationStatus({
                        ...notificationStatus,
                        success: true,
                    });
                    clearInput();
                }
            })
            .catch((err) => {
                console.log(err);
                triggerError("Error when creating question!");
            });
        refreshQuestionList();
    };

    const handleDeleteQuestion = (id) => {
        props
            .createAxiosHeader()
            .post(URL_DELETE_QUESTION, {
                id: id,
            })
            .then(() => {
                refreshQuestionList();
            })
            .catch((err) => {
                triggerError("Failed to delete questions!");
            });
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
                    <Tab value={0} label="Create" />
                    <Tab value={1} label="Edit" disabled={!editMode.edit} />
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
                <Button color="primary" onClick={handleCreateQuestion}>
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
                <Grid className="align-items-center d-flex flex-row" container>
                    <Grid item xs={4}>
                        <Typography sx={{ fontSize: "h4.fontSize" }}>
                            Question List
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={refreshQuestionList}
                        >
                            Refresh
                        </Button>
                    </Grid>
                </Grid>

                <div style={{ maxHeight: "80vh", overflow: "auto" }}>
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
                            key={idx}
                        >
                            <Grid item xs={5} key={idx}>
                                {item._id}
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                style={{
                                    overflowY: "hidden",
                                    overflowX: "auto",
                                }}
                                key={idx}
                            >
                                {item.difficulty}
                            </Grid>
                            <Grid item xs={1} key={idx}>
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
                                        onClick={() => {
                                            handleDeleteQuestion(item._id);
                                        }}
                                        key={idx}
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    overflowY: "hidden",
                                    overflowX: "auto",
                                }}
                                key={idx}
                            >
                                {item.content}
                            </Grid>
                        </Grid>
                    ))}
                </div>
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
                    {errorType}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default QuestionAdminPage;
