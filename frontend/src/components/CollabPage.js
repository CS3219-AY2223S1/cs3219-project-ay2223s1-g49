import React from 'react';
import {
  Typography,
  Button,
  Divider,
} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import {
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import rocketImage from "../images/rocketImage.gif";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: '#FFFFFF',
  },
  QuestionContainer: {
    height: '100vh',
    borderRight: '1px solid rgba(155, 191, 250)',
  },
  CodeContainer: {
    height: '100vh',
  },
  ChatContainer: {
    height: '100vh',
    borderLeft: '1px solid rgba(155, 191, 250)',
  },
}));

function CollabPage() {
  const classes = useStyles();
  const question = "Longest Palindromic Substring"
  const difficulty = "Medium"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  return (
    <Container fluid className={classes.mainContainer}>
      <Row>
        <Col className={classes.QuestionContainer} xs={4}>
          <div class="d-flex justify-content-center">
            <Image fluid src={rocketImage} style={{width: '40%'}}/>
          </div>
          <Typography style={{ marginLeft: 20, marginTop: 20, flexGrow: 1, fontWeight: 600, fontSize: 23}}>
             {question}
          </Typography>
          <Button variant="outlined" style={{ marginLeft: 20, marginTop: 10 }} disabled>
            {difficulty}
          </Button>
          <Divider style={{ marginLeft: 20, marginTop: 20, width: '40vh', backgroundColor: "#343536"}}/>
          <Typography style={{ marginLeft: 20, marginTop: 30, fontSize: 15}}>
             {description}
          </Typography>
        </Col>
        <Col className={classes.CodeContainer} xs={5}>
          <Row>
          <div style={{height: "10vh", backgroundColor: "#5692F5",
            borderBottom: '1px solid rgba(155, 191, 250)'}} >

          </div>
          <div style={{height: "80vh"}} >
          </div>
          <div style={{height: "10vh", backgroundColor: "#5692F5",
            borderTop: '1px solid rgba(155, 191, 250)'}} >
          </div>
          </Row>
        </Col>
        <Col className={classes.ChatContainer} xs={3}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Typography style={{marginTop: 10, fontSize: 10, fontSize: 20, fontWeight: 600,
              fontStyle: 'italic', color: "#5692F5"}}>
              Chat Application
            </Typography>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CollabPage;