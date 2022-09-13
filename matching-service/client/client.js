import { io } from "socket.io-client";

const socket = io('http://localhost:8001');

socket.on("connect", () => {
    console.log(`Connected with id of: ${socket.id}`);

    socket.on(`matchSuccess`, (socketId1, socketId2, newRoomId) => {
        console.log(`i hear youuuuuuuuuuuuuuuuuuuuu`)
        if (socket.id == socketId1 || socket.id == socketId2) {
        //   socket.join(newRoomId, function() {
        //     console.log(`Socket is now in room`);
        // });
          console.log(`Successfully joined room! of ${newRoomId}`)
        }
    })
})

socket.emit("match", {username : 'mantis', difficulty : 'easy'});
