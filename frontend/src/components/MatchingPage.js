import React from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { findMatch, timeOut } from "../client/client.js";
import ParticlesComponent from "./Particles.js";
import Timer from "./Timer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import rocketImage from "../images/rocket.gif";
import greenPlanet from "../images/green-planet.png";
import redPlanet from "../images/red-planet.png";
import yellowPlanet from "../images/yellow-planet.png";
import moonImage from "../images/moon.gif";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        backgroundColor: "#0B034A",
    },
    leftContainer: {
        height: "100vh",
    },
    rightContainer: {
        backgroundColor: "#212121",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    planetImage: {
        borderRadius: 10,
        height: "100%",
        width: "100%",
    },
    modalStyle: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 380,
        height: 450,
        backgroundColor: "#161844",
        boxShadow: theme.shadows[5],
    },
}));

function MatchingPage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [matchStatus, setMatchStatus] = React.useState(
        "Please wait while we find you a match"
    );
    const [oldpassword, setOldPw] = React.useState("");
    const [newpassword, setNewPw] = React.useState("");
    const [verifynewpassword, setVerifyNewPw] = React.useState("");
    const resetPasswordFields = () => {
        setOldPw("");
        setNewPw("");
        setVerifyNewPw("");
    };
    const renderNotification = (type) => {
        switch (type) {
            case "wrong-old-password":
                return "Old password entered is invalid, please re-enter your old password.";
            case "wrong-verify-password":
                return "New password mismatch, please re-enter your new password.";
            case "missing-field":
                return "All fields are required, please try again.";
            default:
                return "Unable to change password, please try again later";
        }
    };
    const handleMatchInProgress = () =>
        setMatchStatus("Please wait while we find you a match");
    const handleNoMatchFound = () =>
        setMatchStatus("No match available now. Please try again later");
    const [difficultyLevel, setDifficultyLevel] = React.useState("Hard");
    const handleEasy = () => {
        setDifficultyLevel("Easy");
        return "Easy";
    };
    const handleMedium = () => {
        setDifficultyLevel("Medium");
        return "Medium";
    };
    const handleHard = () => {
        setDifficultyLevel("Hard");
        return "Hard";
    };
    return (
        <Container fluid className={classes.mainContainer}>
            <Row >
                <Col className={classes.leftContainer} xs={4}>
                    <div className="d-flex justify-content-center mt-4">
                        <Image
                            fluid
                            src={rocketImage}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Card
                            className="text-center"
                            style={{ width: "18rem" }}
                        >
                            <Card.Body>
                                <Card.Title>
                                    <p className="text-uppercase">
                                        PEER-ER {props.username}
                                    </p>
                                </Card.Title>
                                <Card.Text>
                                    Ready to take on some challenges?
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <Button
                            variant="outlined"
                            onClick={props.handleLogout}
                            component={Link}
                            to="/mainpage"
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#21b6ae",
                                padding: "10px 30px",
                                fontSize: "15px",
                                color: "#eeeeee",
                                mx: 1,
                            }}
                        >
                            LOGOUT
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => props.setOpenDialog(true)}
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#21b6ae",
                                padding: "10px 30px",
                                fontSize: "15px",
                                color: "#eeeeee",
                                mx: 1,
                            }}
                        >
                            CHANGE PASSWORD
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => props.setOpenConfirmation(true)}
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#21b6ae",
                                padding: "10px 30px",
                                fontSize: "15px",
                                color: "#eeeeee",
                                mx: 1,
                            }}
                        >
                            DELETE ACCOUNT
                        </Button>
                    </div>
                </Col>
                <Col className={classes.rightContainer} xs={8}>
                    <div>
                        <Typography
                            style={{
                                marginLeft: 20,
                                flexGrow: 1,
                                fontWeight: 600,
                                fontSize: 40,
                            }}
                            color="#FFFFFF"
                        >
                            Welcome to Peerprep
                            <RocketLaunchIcon
                                style={{
                                    marginLeft: 6,
                                    marginBottom: 4,
                                    fontSize: 40,
                                }}
                            />
                        </Typography>
                    </div>
                    <div className="mt-2">
                        <Typography
                            style={{
                                marginLeft: 20,
                                flexGrow: 1,
                                fontWeight: 600,
                                fontSize: 25,
                            }}
                            color="#FFFFFF"
                        >
                            Find a Coding Partner
                        </Typography>
                        <Typography
                            style={{
                                marginLeft: 20,
                                flexGrow: 1,
                                fontSize: 14,
                            }}
                            color="#FFFFFF"
                        >
                            Collaborate with another student and practice for
                            your interviews together.
                        </Typography>
                    </div>
                    <div className="mt-2 d-flex flex-row">
                        <Card
                            className="overflow-hidden"
                            style={{
                                width: "31%",
                                height: "13vw",
                                marginLeft: 20,
                                borderColor: "#FFFFFF",
                                borderRadius: 5,
                            }}
                            onClick={() => {
                                handleMatchInProgress();
                                handleOpen();
                                findMatch(props.username, handleEasy());
                            }}
                        >
                            <Card.Img
                                src={greenPlanet}
                                alt="Card image"
                                className={classes.planetImage}
                            />
                        </Card>
                        <Card
                            className="overflow-hidden"
                            style={{
                                width: "31%",
                                height: "13vw",
                                marginLeft: 10,
                                borderColor: "#FFFFFF",
                                borderRadius: 5,
                            }}
                            onClick={() => {
                                handleMatchInProgress();
                                handleOpen();
                                findMatch(props.username, handleMedium());
                            }}
                        >
                            <Card.Img
                                src={yellowPlanet}
                                alt="Card image"
                                className={classes.planetImage}
                            />
                        </Card>
                        <Card
                            className="overflow-hidden"
                            style={{
                                width: "31%",
                                height: "13vw",
                                marginLeft: 10,
                                borderColor: "#FFFFFF",
                                borderRadius: 5,
                            }}
                            onClick={() => {
                                handleHard();
                                handleMatchInProgress();
                                handleOpen();
                                findMatch(props.username, handleHard());
                            }}
                        >
                            <Card.Img
                                src={redPlanet}
                                alt="Card image"
                                className={classes.planetImage}
                            />
                        </Card>
                    </div>
                </Col>
            </Row>
            <Modal open={open}>
                <Box className={classes.modalStyle}>
                    <Image
                        fluid
                        src={moonImage}
                        style={{ height: "64%", width: "100%" }}
                    />
                    <Typography
                        style={{
                            marginTop: -40,
                            flexGrow: 1,
                            fontWeight: 600,
                            fontSize: 15,
                        }}
                        color="#FFFFFF"
                    >
                        {matchStatus}
                    </Typography>
                    <Timer
                        maxRange={30}
                        username={props.username}
                        difficultyLevel={difficultyLevel}
                        handleNoMatchFound={handleNoMatchFound}
                    />
                    <div style={{ paddingBottom: 30 }}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleClose();
                                timeOut(props.username, difficultyLevel);
                            }}
                            style={{ backgroundColor: "#FFFFFF" }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
            <ParticlesComponent />

            <Dialog
                open={props.openDialog}
                onClose={() => props.setOpenDialog(false)}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "fit-content",
                        alignItems: "center",
                        margin: 5,
                    }}
                >
                    <Grid sx={{ textAlign: "center" }}>
                        <DialogTitle
                            sx={{
                                letterSpacing: 2,
                                p: 2,
                                mb: 3,
                                fontSize: "h4.fontSize",
                            }}
                        >
                            <b>Change Password</b>
                        </DialogTitle>
                    </Grid>
                    <Grid
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Grid sx={{ my: 2 }}>
                            <div>Old Password</div>
                            <TextField
                                id="oldpw"
                                variant="outlined"
                                type="password"
                                value={oldpassword}
                                onChange={(e) => setOldPw(e.target.value)}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#F1F5F8",
                                    width: "100%",
                                }}
                            ></TextField>
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                            <div>New Password</div>
                            <TextField
                                fullwidth
                                id="oldpw"
                                variant="outlined"
                                type="password"
                                value={newpassword}
                                onChange={(e) => setNewPw(e.target.value)}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#F1F5F8",
                                    width: "100%",
                                }}
                            ></TextField>
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                            <div>Re-enter New Password</div>
                            <TextField
                                fullwidth
                                id="verifynewpw"
                                variant="outlined"
                                type="password"
                                value={verifynewpassword}
                                onChange={(e) => setVerifyNewPw(e.target.value)}
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#F1F5F8",
                                    width: "100%",
                                }}
                            ></TextField>
                        </Grid>

                        <Button
                            variant={"outlined"}
                            onClick={() => {
                                resetPasswordFields();
                                props.handleChangePassword(
                                    oldpassword,
                                    newpassword,
                                    verifynewpassword
                                );
                            }}
                            sx={{
                                my: "2rem",
                                background:
                                    "linear-gradient(45deg, #217F95 20%, #E19D92 90%)",
                                border: 0,
                                borderRadius: 10,
                                boxShadow:
                                    "0 1px 5px 2px rgba(81, 135, 149, .2)",
                                color: "white",
                                height: 48,
                                padding: "0 30px",
                            }}
                        >
                            Change Password
                        </Button>
                    </Grid>
                </Box>
            </Dialog>
            <Snackbar
                open={props.openSuccessNotification}
                autoHideDuration={5000}
                onClose={() => {
                    props.setOpenSuccessNotification(false);
                }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity="success"
                    onClose={() => {
                        props.setOpenSuccessNotification(false);
                    }}
                >
                    Password successfully changed!
                </Alert>
            </Snackbar>

            <Snackbar
                open={props.openFailureNotification}
                autoHideDuration={5000}
                onClose={() => {
                    props.setOpenFailureNotification(false);
                }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity="error"
                    onClose={() => {
                        props.setOpenFailureNotification(false);
                    }}
                >
                    {renderNotification(props.failureType)}
                </Alert>
            </Snackbar>

            <Dialog
                open={props.openConfirmation}
                onClose={() => props.setOpenConfirmation(false)}
            >
                <DialogTitle>Confirm deletion of account?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once account is deleted, the information lost will be
                        irreversible.
                        <br></br>
                        Are you sure you want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => props.setOpenConfirmation(false)}
                        sx={{
                            backgroundColor: "#ED3447",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="text" onClick={props.handleDeleteAccount}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default MatchingPage;
