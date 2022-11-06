import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
  IconButton,
  ThemeProvider
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/SendRounded';
import {
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import { theme } from "../styles/theme.js"
import rocketImage from "../images/rocketImage.gif";
import validateToken from "./validate-token";
import { URL_USER_GET_USERNAME, URL_GET_SPECIFIC_QUESTIONS } from "../configs";
import { sendChatMessage, runCollabService, getCollabDetails, quitCollab, runChatService } from "../client/client.js"
import RealTimeEditor from "../client/realTimeEditor.jsx"


const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: '#FFFFFF',
  },
  questionContainer: {
    height: '100vh',
    borderRight: '1px solid rgba(235, 233, 230)',
  },
  codeContainer: {
    height: '100vh',
  },
  chatContainer: {
    height: '100vh',
    borderLeft: '1px solid rgba(235, 233, 230)',
  },
  chatWindow: {
    height: '90vh',
    width: '100%',
    paddingBottom: '5px',
  },
  chatMessages: {
    bottom: 0,
    position: 'fixed',
    overflow: 'auto',
    minHeight: '100%',
  },
  bubbleContainer: {
    width: 'auto',
  },
  bubble: {
    border: '0.5px solid black',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    width: 'auto'
  }
}));


function CollabPage() {
  const navigate = useNavigate();
  const cookies = new Cookies()
  const classes = useStyles();
  //const question = "Longest Palindromic Substring";
  //const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const [questionId, setQuestionId] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(cookies.get('access token'));
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const sendMessage = () => {
    if (message) {
      sendChatMessage(username, message);
    }
  }

  const handleEndSession = () => {
    quitCollab(username)
  }

  useEffect(() => {
      if (roomId !== null && username !== null && difficulty !== null) {
        runCollabService(roomId, username, difficulty);   
        runChatService(roomId);
      }
  }, [roomId, username, difficulty])

  const getQuestion = async (event) =>  {
    const data = await axios.post(URL_GET_SPECIFIC_QUESTIONS, {
      id: questionId
    }).catch(err => {
      console.log(err);
    })
    setDescription(data.data.content);
  }

  function createAxiosHeader() {
    const jwt = cookies.get('access token');
    const instance = axios.create({
      headers: {
        'Authorization': jwt
      }
    });
    return instance;
  }

  const initialiseUsername = () => {
    const instance = createAxiosHeader();
    instance.post(URL_USER_GET_USERNAME)
      .then(res => { 
        setUsername(res.data.username)   
      })
      .catch((err) => { console.log("Error getting username from cookie: ", err.toJSON()) })
  }

  validateToken(token).then(tokenValid => {
    console.log("verifying token")
    if (!tokenValid) {
      console.log("invalid token")
      cookies.remove('access token')
      navigate('/login')
    } else {
      console.log("valid token")
      initialiseUsername()
      getCollabDetails(username)
      const detail1 = JSON.parse(localStorage.getItem("globalVariable"));
      const detail2 = JSON.parse(localStorage.getItem("questionDetails"));
      if (detail1 !== null) {
        setRoomId(detail1.roomId)
        setDifficulty(detail1.difficulty)
        setQuestionId(detail2.questionId);
        getQuestion(detail2.questionId);
      } else {
        navigate("/mainpage")
      }
    }
  })

  return (
    <Container fluid className={classes.mainContainer}>
      <Row>
        <Col className={classes.questionContainer} xs={4}>
          <div class="d-flex justify-content-center">
            <Image fluid src={rocketImage} style={{ width: '40%' }} />
          </div>
          <Typography style={{ marginLeft: 20, marginTop: 20, flexGrow: 1, fontWeight: 600, fontSize: 23 }}>
            {questionId}
          </Typography>
          <ThemeProvider theme={theme}>
            <Button 
              variant="outlined" 
              style={{ marginLeft: 20, marginTop: 10}} color={difficulty === "Easy" ? "success" : difficulty === "Medium" ? "secondary" : "primary"}>
              {difficulty}
            </Button>
          </ThemeProvider>
          <Divider style={{ marginLeft: 20, marginTop: 20, width: '40vh', backgroundColor: "#343536" }} />
          <Typography style={{ marginLeft: 20, marginTop: 30, fontSize: 15 }}>
            {description}
          </Typography>
        </Col>
        <Col className={classes.codeContainer} xs={5}>
          <Row>
            <div style={{ height: "90vh" }} >
              <RealTimeEditor />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              height: "10vh", borderTop: '1px solid rgba(155, 191, 250)'
            }} >
              <div>
                <Button variant="outlined"
                  onClick={() => handleEndSession()}
                  style={{ borderRadius: 5, backgroundColor: "#e6f6ff" }}>
                  End Session
                </Button>
              </div>
            </div>
          </Row>
        </Col>
        <Col className={classes.chatContainer} xs={3}>
          <Row>
            <div class="d-flex justify-content-center">
              <Typography style={{
                marginTop: 10, fontSize: 20, fontWeight: 600,
                fontStyle: 'italic', color: "#0B034A"
              }}>
                Chat Application
              </Typography>
            </div>
            <Divider style={{ marginTop: 5, backgroundColor: "#343536" }} />
            <Grid container>
              <Grid className={classes.chatWindow} item>
                <div class="chat-messages">
                </div>
              </Grid>
              <Grid xs={10} item>
                <TextField
                  value={message}
                  onChange={handleMessageChange}
                  label="Type in your message"
                  size="small"
                  variant="outlined"
                  style={{ marginTop: 10 }}
                  fullWidth />
              </Grid>
              <Grid xs={2} item>
                <IconButton style={{ marginLeft: 10, marginTop: 10 }} onClick={sendMessage} >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CollabPage;