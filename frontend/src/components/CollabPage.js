import {useState} from "react";
import {
  Typography,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton
} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/SendRounded';
import {
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import rocketImage from "../images/rocketImage.gif";
import {ChatMessageText} from "../model/ChatMessageText.js"

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
    height: '82vh',
    paddingBottom: '5px'
  },
  chatMessages: {
    height: '18rem',
    overflow: 'auto',
  }
}));


function CollabPage() {
  const classes = useStyles();
  const question = "Longest Palindromic Substring"
  const difficulty = "Medium"
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const [chatMessages, setChatMessages] = useState([
    new ChatMessageText('Jun Heng', "Hello"),
  ]);
  const [message, setMessage] = useState("");
  const chatMessagesList = chatMessages.map((chatMessageText, index) => (
    <ListItem key={index}>
      <ListItemText primary={`${chatMessageText.username}: ${chatMessageText.message}`}/>
    </ListItem>
  ));

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const sendMessage = () => {
    if (message) {
      console.log("Send");
    }
  }

  return (
    <Container fluid className={classes.mainContainer}>
      <Row>
        <Col className={classes.questionContainer} xs={4}>
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
        <Col className={classes.codeContainer} xs={5}>
          <Row>
          <div style={{height: "90vh"}} >
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: "10vh", backgroundColor: "#0B034A", borderTop: '1px solid rgba(155, 191, 250)'}} >
              <div>
                <Button variant="outlined"
                  onClick={() => alert("End Session")}
                  style={{ borderRadius: 5, backgroundColor: "#e6f6ff"}}>
                  End Session
                </Button>
              </div>
          </div>
          </Row>
        </Col>
        <Col className={classes.chatContainer} xs={3}>
          <Row>
            <div class="d-flex justify-content-center">
              <Typography style={{marginTop: 10, fontSize: 20, fontWeight: 600,
                fontStyle: 'italic', color: "#0B034A"}}>
                Chat Application
              </Typography>
            </div>
            <Divider style={{ marginTop: 5, backgroundColor: "#343536"}}/>
            <Grid container>
              <Grid className={classes.chatWindow} xs={12} item>
                <List className={classes.chatMessages}>
                  <Typography>
                  {chatMessagesList}
                  </Typography>
                </List>
              </Grid>
              <Grid xs={10} item>
                <TextField
                  value={message}
                  onChange={handleMessageChange}
                  label="Type in your message"
                  size="small"
                  variant="outlined"
                  style={{marginTop: 10}}
                  fullWidth />
              </Grid>
              <Grid xs={2} item>
                <IconButton style={{marginLeft: 10, marginTop: 10}} onClick={sendMessage} >
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