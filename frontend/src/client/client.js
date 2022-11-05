import { io } from "socket.io-client";
import { MATCH_SVC_URI_HOSTNAME, COLLAB_SVC_URI_HOSTNAME, CHAT_SVC_URI_HOSTNAME, URL_GET_RANDOM_QUESTION  } from "../configs";
import axios from 'axios'


//contains key: CollabSocket.Id, value: sharedRoomId
export var dictionarySharedRoomId = {}

//contains key: Collabsocket.Id, value: username
export var dictionaryusername = {}

//contains key: Collabsocket.Id, value: difficulty
export var dictionarydifficulty = {}


//-------------------------------- Matching service ----------------------------------------------------
const matchingHost = MATCH_SVC_URI_HOSTNAME
export const matchingSocket = io(matchingHost)

export function collabWithRandomQuestionId(newRoomId, username, difficulty) {
  var randomId = null
  axios.create().post(URL_GET_RANDOM_QUESTION, {
    difficulty: difficulty
  })
  .then((resp) => {
      randomId = resp.data.id
      collabSocket.emit('collab', newRoomId, username, difficulty, randomId)
  })
  .catch((err) => {
      // do err handling
  });
}

matchingSocket.on("connect", async () => {
    console.log(`Client (FrontEnd) connected to Matching service with id of: ${matchingSocket.id}`)

    matchingSocket.on(`matchSuccess`, async (newRoomId) => {
      console.log(`Successfully matched with matching Id: ${newRoomId} for username ${dictionaryusername[collabSocket.id]}, difficulty: ${dictionarydifficulty[collabSocket.id]}`)
      const globalDetails = {
        roomId: newRoomId,
        username: dictionaryusername[collabSocket.id],
        difficulty: dictionarydifficulty[collabSocket.id]
      }
      localStorage.setItem("globalVariable", JSON.stringify(globalDetails))
      window.location.href = `/collab`; 
    })

    matchingSocket.on(`getUserDetails`, (details) => {
      console.log(`Details for ${dictionaryusername[collabSocket.id]} are: ${details}`)
    })
})

export function runCollabService(newRoomId, username, difficulty) {
    const cid = collabSocket.id
    dictionarySharedRoomId[cid] = newRoomId
    dictionaryusername[collabSocket.id] = username

    collabWithRandomQuestionId(newRoomId, username, difficulty)
}

export function runChatService(newRoomId) {
  chatSocket.emit('chat', newRoomId)
}

export function timeOut(usernameVal, difficultyVal) {
  console.log("Client timed out!")
  matchingSocket.emit(`timeout`, {username : usernameVal, difficulty : difficultyVal})
}


export function findMatch(usernameVal, difficultyVal) {
  console.log("Client finding match")
  const cid = collabSocket.id
  dictionaryusername[cid] = usernameVal
  dictionarydifficulty[cid] = difficultyVal
  matchingSocket.emit('match', {username : usernameVal, difficulty : difficultyVal})
}

export function getMatchingDetails(username) {
  matchingSocket.emit(`getUserDetails`, username)
}
//-------------------------------- Collab service ----------------------------------------------------
const collabHost = COLLAB_SVC_URI_HOSTNAME
export const collabSocket = io(collabHost, {
    transports: ['websocket']
  })

collabSocket.on("connect", () => {
    console.log(`Client (FrontEnd) connected to collab service with id of: ${collabSocket.id}`)

    collabSocket.on(`collabSuccess`, (collabRoomId, questionId) => {
      console.log(`Client (FrontEnd) has successfully joined collab room : ${collabRoomId} with question Id of ${questionId}`);
      //frontEnd.setQuestion(questionId)
      const questionDetails = {
        roomId: collabRoomId,
        questionId: questionId
      }
      localStorage.setItem("questionDetails", JSON.stringify(questionDetails));
    })

    collabSocket.on('getUserDetails', (Details) => {
      console.log(`Details for ${dictionaryusername[collabSocket.id]} are: ${Details}`)
      if (Details != null) {
        localStorage.setItem("globalVariable", JSON.stringify(Details))
      }
    })

    collabSocket.on('quitCollabSuccess', () => {
      localStorage.removeItem("globalVariable");
      window.location.href = `/mainpage`; 
    })

    collabSocket.on(`quitCollabPing`, () => {
      console.log(`pinged ${dictionaryusername[collabSocket.id]}!!!!!!!!!`)
      collabSocket.emit(`quitCollab`, dictionaryusername[collabSocket.id])
    })

})

export function quitCollab(username) {
  console.log(`quitting for ${username}`)
  collabSocket.emit(`quitCollab`, username)
}


export function getCollabDetails(username) {
  collabSocket.emit(`getUserDetails`, username)
}

//-------------------------------- Chat Service ----------------------------------------------------
const chatbHost = CHAT_SVC_URI_HOSTNAME
export const chatSocket = io(chatbHost, {
  transports: ['websocket']
})

chatSocket.on("connect", () => {
  console.log(`New Socket Connection ${chatSocket.id}`)
})

chatSocket.on("message", (messageObject) => {
  outputMessage(messageObject);
})

export function sendChatMessage(username, message) {
  const messageObject = {username: username, message: message}
  chatSocket.emit('chatMessage', messageObject);
}

function outputMessage(messageObject) {
  const {username, message} = messageObject;
  const time = getFormattedTime();
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${username} <span> ${time} </spam> </p>
    <p class="text">
      ${message}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div);

}

function getFormattedTime() {
  const d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  if (minutes.toString().length !== 2) {
    minutes = "0" + minutes
  }
  return hours + ":" + minutes + ampm;
}
