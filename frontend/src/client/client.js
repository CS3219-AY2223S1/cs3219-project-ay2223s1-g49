import { io } from "socket.io-client";

const socket = io('http://localhost:3001');

socket.on("connect", () => {
    console.log(`Client connected with id of: ${socket.id}`);

    socket.on(`matchSuccess`, (socketId1, newRoomId) => {
        if (socket.id === socketId1 || socket.id === newRoomId) {
          console.log(`Successfully joined room! of ${newRoomId}`)
        }
    })
})


export function findMatch(usernameVal, difficultyVal) {
  console.log("calling...")
  socket.emit('match', {username : usernameVal, difficulty : difficultyVal});
  console.log("CALLED")
}