import React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal
} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import {
  Container,
  Row,
  Col,
  Image,
  Card
} from "react-bootstrap";
import {Link} from "react-router-dom";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  findMatch,
  timeOut
} from "../client/client.js";
import ParticlesComponent from "./Particles.js";
import Timer from "./Timer.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import rocketImage from "../images/rocket.gif";
import greenPlanet from "../images/green-planet.png";
import redPlanet from "../images/red-planet.png";
import yellowPlanet from "../images/yellow-planet.png";
import moonImage from "../images/moon.gif";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: '#0B034A',
  },
  leftContainer: {
    height: '100vh',
  },
  rightContainer: {
    backgroundColor: '#FFFFFF',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  planetImage: {
    borderRadius: 10,
    height: '100%',
    width: '100%'
  },
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    height: 450,
    backgroundColor: '#161844',
    boxShadow: theme.shadows[5],
  },
}));


function MatchingPage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [matchStatus, setMatchStatus] = React.useState("Please wait while we find you a match");
    const handleMatchInProgress = () => setMatchStatus("Please wait while we find you a match");
    const handleNoMatchFound = () => setMatchStatus("No match available now. Please try again later");
    const [difficultyLevel, setDifficultyLevel] = React.useState("hard");
    const handleEasy = () => {
      setDifficultyLevel("easy");
      return "easy"
    }
    const handleMedium = () => {
      setDifficultyLevel("medium");
      return "medium"
    }
    const handleHard = () => {
      setDifficultyLevel("hard");
      return "hard"
    }
    return (
    <Container fluid className={classes.mainContainer}>
      <Row>
        <Col className={classes.leftContainer} xs={4}>
            <div class="d-flex justify-content-center mt-4">
              <Image fluid src={rocketImage} style={{height: '100%', width: '100%'}}/>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <Card class="text-center" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>
                    <p class="text-uppercase"> PEER-ER {props.username} </p>
                  </Card.Title>
                  <Card.Text>
                    Ready to take on some challenges?
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <Button
                variant="outlined"
                onClick={props.handleLogout}
                component={Link}
                to="/mainpage"
                style={{
                    borderRadius: 35,
                    backgroundColor: "#21b6ae",
                    padding: "10px 30px",
                    fontSize: "15px"
                }}> LOGOUT </Button>
            </div>
        </Col>
        <Col className={classes.rightContainer} xs={8}>
            <div>
              <Typography style={{ marginLeft: 20, flexGrow: 1, fontWeight: 600, fontSize: 40}} color="#424242">
                Welcome to Peerprep
                <RocketLaunchIcon style={{marginLeft: 6, marginBottom: 4,fontSize: 40}}/>
              </Typography>
            </div>
            <div class="mt-2">
              <Typography style={{ marginLeft: 20, flexGrow: 1, fontWeight: 600, fontSize: 25}} color="#424242">
                Find a Coding Partner
              </Typography>
              <Typography style={{ marginLeft: 20, flexGrow: 1, fontSize: 14}} color="#424242">
                Collaborate with another student and practice for your interviews together.
              </Typography>
            </div>
            <div class="mt-2 d-flex flex-row">
              <Card
                class="overflow-hidden"
                style={{ width: '31%', height: '13vw', marginLeft: 20, borderColor: '#FFFFFF', borderRadius: 5}}
                onClick={() => {
                  handleMatchInProgress();
                  handleOpen();
                  findMatch(props.username, handleEasy())}}>
                <Card.Img src={greenPlanet} alt="Card image" className={classes.planetImage}/>
              </Card>
              <Card
                class="overflow-hidden"
                style={{ width: '31%', height: '13vw', marginLeft: 10, borderColor: '#FFFFFF', borderRadius: 5}}
                onClick={() => {
                  handleMatchInProgress();
                  handleOpen();
                  findMatch(props.username, handleMedium())}}>
                <Card.Img src={yellowPlanet} alt="Card image" className={classes.planetImage}/>
              </Card>
              <Card
                class="overflow-hidden"
                style={{ width: '31%', height: '13vw', marginLeft: 10, borderColor: '#FFFFFF', borderRadius: 5}}
                onClick={() => {
                  handleHard();
                  handleMatchInProgress();
                  handleOpen();
                  findMatch(props.username, handleHard())}}>
                <Card.Img src={redPlanet} alt="Card image" className={classes.planetImage} />
              </Card>
            </div>
        </Col>
      </Row>
      <Modal open={open}>
        <Box className={classes.modalStyle}>
          <Image fluid src={moonImage} style={{height: '64%', width: '100%'}}/>
          <Typography style={{ marginTop: -40, flexGrow: 1, fontWeight: 600, fontSize: 15}} color="#FFFFFF">
            {matchStatus}
          </Typography>
          <Timer
            maxRange={30}
            username={props.username}
            difficultyLevel={difficultyLevel}
            handleNoMatchFound={handleNoMatchFound}/>
          <div style={{paddingBottom: 30}}>
            <Button variant="outlined"
              onClick={() => {
                handleClose();
                timeOut(props.username, difficultyLevel);
              }}
              style={{backgroundColor:'#FFFFFF'}}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      <ParticlesComponent />
    </Container>
    );
}

export default MatchingPage;
