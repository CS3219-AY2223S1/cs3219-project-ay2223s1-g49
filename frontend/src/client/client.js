import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

socket.on("connect", () => {
    console.log(`Client (C) connected with id of: ${socket.id}`);

    socket.on(`matchSuccess`, (socketId1, newRoomId) => {
        if (socket.id === socketId1 || socket.id === newRoomId) {
          console.log(`Successfully joined room! of ${newRoomId}`)
        }
    })
})


export function findMatch(usernameVal, difficultyVal) {
  console.log("Client finding match")
  socket.emit('match', {username : usernameVal, difficulty : difficultyVal});
}