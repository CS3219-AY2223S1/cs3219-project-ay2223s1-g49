import { io } from "socket.io-client";

const socket = io('http://localhost:3001');

socket.on("connect", () => {
    console.log(`Client (FrontEnd) connected with id of: ${socket.id}`);

    socket.on(`matchSuccess`, (newRoomId) => {
      console.log(`Successfully joined room! of ${newRoomId}`)
    })
})

export function timeOut(usernameVal, difficultyVal) {
  console.log("Client timed out!")
  socket.emit(`timeout`, {username : usernameVal, difficulty : difficultyVal})
}


export function findMatch(usernameVal, difficultyVal) {
  console.log("Client finding match")
  socket.emit('match', {username : usernameVal, difficulty : difficultyVal})
}