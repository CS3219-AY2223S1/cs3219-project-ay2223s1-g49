import { io } from "socket.io-client";

var roomId = null
var username = null
var difficulty = null

function setBasicInfo(user, diff) {
  username = user
  difficulty = diff
}

//-------------------------------- Matching service ----------------------------------------------------

const matchingSocket = io('http://localhost:3001')

matchingSocket.on("connect", () => {
    console.log(`Client (FrontEnd) connected to Matching service with id of: ${matchingSocket.id}`)

    matchingSocket.on(`matchSuccess`, (newRoomId) => {
      console.log(`Successfully matched with matching Id: ${newRoomId}`)
      matchingSocket.emit(`quitMatching`)
      roomId = newRoomId
      collabSocket.emit(`collab`, roomId, username, difficulty)
      viewConnectedCollabRooms()
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
const collabSocket = io('http://localhost:3002')

collabSocket.on("connect", () => {
    console.log(`Client (FrontEnd) connected to collab service with id of: ${collabSocket.id}`)

    collabSocket.on(`collab`, (collabRoomId, username, difficulty) => {
      console.log(`Client (FrontEnd) is attempting to join collab room of ${collabRoomId}`)
    })

    collabSocket.on(`collabSuccess`, (collabRoomId) => {
      console.log(`Client (FrontEnd) has successfully joined collab room : ${collabRoomId}`)
    })

    collabSocket.on(`viewConnectedCollabRooms`, () => {
      console.log(`These are the rooms that ${username} is connected to`)
      collabSocket.rooms.forEach((value) => {
        console.log(value)
      })
      console.log(`-----END-----`)
    })
})

export function quitCollab() {
  collabSocket.emit(`quitCollab`, roomId, username)
}

export function viewConnectedCollabRooms() {
  collabSocket.emit(`viewConnectedCollabRooms`)
}
