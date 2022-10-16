import React from 'react';
import {
  Button,
  Typography
} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import {
  Container,
  Carousel,
  Row,
  Col,
  Image,
  Card
} from "react-bootstrap";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import 'bootstrap/dist/css/bootstrap.min.css';
import rocketImage from "../images/rocket.gif";
import greenPlanet from "../images/green-planet.png"
import redPlanet from "../images/red-planet.png"
import yellowPlanet from "../images/yellow-planet.png"
import ParticlesComponent from "./Particles.js"

const useStyles = makeStyles({
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
  }
})

function MatchingPage() {
    const classes = useStyles();
    const username = "Sim Jun Heng";
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
                  <Card.Title>PEER-ER {username}</Card.Title>
                  <Card.Text>
                    Ready to take on some challenges?
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <Button
                variant="outlined"
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
                onClick={() => alert("Clicked on Easy Mode")}>
                <Card.Img src={greenPlanet} alt="Card image" className={classes.planetImage}/>
              </Card>
              <Card
                class="overflow-hidden"
                style={{ width: '31%', height: '13vw', marginLeft: 10, borderColor: '#FFFFFF', borderRadius: 5}}
                onClick={() => alert("Clicked on Intermediate Mode")}>
                <Card.Img src={yellowPlanet} alt="Card image" className={classes.planetImage}/>
              </Card>
              <Card
                class="overflow-hidden"
                style={{ width: '31%', height: '13vw', marginLeft: 10, borderColor: '#FFFFFF', borderRadius: 5}}
                onClick={() => alert("Clicked on Hard Mode")}>
                <Card.Img src={redPlanet} alt="Card image" className={classes.planetImage} />
              </Card>
            </div>
        </Col>
      </Row>
      <ParticlesComponent />
    </Container>
    );
}

export default MatchingPage;
