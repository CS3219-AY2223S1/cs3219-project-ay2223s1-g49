import { io } from "socket.io-client";

//contains key: CollabSocket.Id, value: sharedRoomId
export var dictionarySharedRoomId = {}

//contains key: Collabsocket.Id, value: username
export var dictionaryusername = {}

//contains key: Collabsocket.Id, value: difficulty
export var dictionarydifficulty = {}



//-------------------------------- Matching service ----------------------------------------------------

export const matchingSocket = io('http://localhost:3001')

matchingSocket.on("connect", async () => {
    console.log(`Client (FrontEnd) connected to Matching service with id of: ${matchingSocket.id}`)

    matchingSocket.on(`matchSuccess`, async (newRoomId) => {
      console.log(`Successfully matched with matching Id: ${newRoomId}`)
      window.location.href = `/collab?cid=${newRoomId}&username=${dictionaryusername[collabSocket.id]}&difficulty=${dictionarydifficulty[collabSocket.id]}`; 
    })

    matchingSocket.on(`getUserDetails`, (details) => {
      console.log(`Details for ${dictionaryusername[collabSocket.id]} are: ${details}`)
    })
})

export function runCollabService(newRoomId, username, difficulty) {
    const cid = collabSocket.id
    dictionarySharedRoomId[cid] = newRoomId
    collabSocket.emit('collab', newRoomId, username, difficulty)
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
export const collabSocket = io('http://localhost:3002', {
    transports: ['websocket']
  })

collabSocket.on("connect", () => {
    console.log(`Client (FrontEnd) connected to collab service with id of: ${collabSocket.id}`)

    collabSocket.on(`collabSuccess`, (collabRoomId) => {
      console.log(`Client (FrontEnd) has successfully joined collab room : ${collabRoomId}`);

    })

    collabSocket.on('getUserDetails', (Details) => {
      console.log(`Details for ${dictionaryusername[collabSocket.id]} are: ${Details}`)
      // collabSocket.join()
    })

})

export function quitCollab() {
  collabSocket.emit(`quitCollab`, dictionaryusername[collabSocket.id])
}

export function getCollabDetails(username) {
  collabSocket.emit(`getUserDetails`, username)
}

//-------------------------------- Chat Service ----------------------------------------------------

export const chatSocket = io('http://localhost:3003', {
  transports: ['websocket']
})

chatSocket.on("connect", () => {
  console.log(`New Socket Connection ${chatSocket.id}`)
})

chatSocket.on("message", (message) => {
  outputMessage(message);
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
