import { io } from "socket.io-client";

//contains key: CollabSocket.Id, value: sharedRoomId
export var dictionarySharedRoomId = {}

//contains key: Collabsocket.Id, value: username
export var dictionaryusername = {}

//contains key: Collabsocket.Id, value: difficulty
export var dictionarydifficulty = {}


//-------------------------------- Matching service ----------------------------------------------------

export const matchingSocket = io('http://localhost:3001')

matchingSocket.on("connect", () => {
    console.log(`Client (FrontEnd) connected to Matching service with id of: ${matchingSocket.id}`)

    matchingSocket.on(`matchSuccess`, (newRoomId) => {
      console.log(`Successfully matched with matching Id: ${newRoomId}`)
      const cid = collabSocket.id
      dictionarySharedRoomId[cid] = newRoomId
      collabSocket.emit(`collab`, newRoomId, dictionaryusername[cid], dictionarydifficulty[cid])
      //window.location.href = "/test";
    })

    matchingSocket.on(`getUserDetails`, (details) => {
      console.log(`Details for ${dictionaryusername[collabSocket.id]} are: ${details}`)
    })
})

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
    })

})

export function quitCollab() {
  collabSocket.emit(`quitCollab`, dictionaryusername[collabSocket.id])
}

export function getCollabDetails(username) {
  collabSocket.emit(`getUserDetails`, username)
}


