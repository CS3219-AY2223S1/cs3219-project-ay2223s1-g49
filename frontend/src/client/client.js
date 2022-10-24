import { io } from "socket.io-client";

var roomId = null
var username = null
var difficulty = null

function setBasicInfo(user, diff) {
  username = user
  difficulty = diff
}

//-------------------------------- Matching service ----------------------------------------------------

export const matchingSocket = io('http://localhost:3001')

matchingSocket.on("connect", () => {
    console.log(`Client (FrontEnd) connected to Matching service with id of: ${matchingSocket.id}`)

    matchingSocket.on(`matchSuccess`, (newRoomId) => {
      console.log(`Successfully matched with matching Id: ${newRoomId}`)
      matchingSocket.emit(`quitMatching`)
      roomId = newRoomId
      collabSocket.emit(`collab`, roomId, username, difficulty)
    })
})

export function timeOut(usernameVal, difficultyVal) {
  console.log("Client timed out!")
  matchingSocket.emit(`timeout`, {username : usernameVal, difficulty : difficultyVal})
}


export function findMatch(usernameVal, difficultyVal) {
  console.log("Client finding match")
  setBasicInfo(usernameVal, difficultyVal)
  matchingSocket.emit('match', {username : usernameVal, difficulty : difficultyVal})
}

//-------------------------------- Collab service ----------------------------------------------------
export const collabSocket = io('http://localhost:3002', {
  transports: ['websocket']
})

export var myCollabId = ""

collabSocket.on("connect", () => {
    console.log(`Client (FrontEnd) connected to collab service with id of: ${collabSocket.id}`)

    collabSocket.on(`collab`, (collabRoomId, username, difficulty) => {
      myCollabId = collabRoomId
      console.log(`Client (FrontEnd) is attempting to join collab room of ${collabRoomId}`)
    })

    collabSocket.on(`collabSuccess`, (collabRoomId) => {
      console.log(`Client (FrontEnd) has successfully joined collab room : ${collabRoomId}`)
    })

})

export function quitCollab() {
  collabSocket.emit(`quitCollab`, roomId, username)
}

//-------------------------------- Chat Service ----------------------------------------------------

const chatMessages = document.querySelector('.chat-messages');

export const chatSocket = io('http://localhost:3003', {
  transports: ['websocket']
})

chatSocket.on("connect", () => {
  console.log(`New Socket Connection ${chatSocket.id}`)
})

chatSocket.on("message", (message) => {
  outputMessage(message) // Output Message
  chatMessages.scrollTop = chatMessages.scrollHeight; //Scroll to the Bottom of the Chat
})

export function sendChatMessage(message) {
  chatSocket.emit('chatMessage', message);
}

function outputMessage(message) {
  const time = getFormattedTime();
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> Brad <span> ${time} </spam> </p>
    <p class="text">
      ${message}
    </p>`;
  chatMessages.appendChild(div);

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
