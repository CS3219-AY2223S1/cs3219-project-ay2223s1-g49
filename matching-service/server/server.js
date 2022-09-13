import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { createMatch, deleteMatchForUser, getMatchForDifficulty, attemptJoinMatch } from '../controller/match-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app)

httpServer.listen(8001);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log('Client connected with id: ' + socket.id)

  socket.on('match', (message) => {
    getMatchForDifficulty(message.difficulty).then(result => {
      if (result == null) {
        createMatch(message, socket.id);
      } else {
        attemptJoinMatch(message, socket);
      }
    })
  })

  socket.on(`get`, (message) => {
    getMatchForDifficulty(message.difficulty);
  })

  socket.on(`delete`, (message) => {
    deleteMatchForUser(message.username);
  })

  socket.on(`matchSuccess`, (socketId1, socketId2, newRoomId) => {
    console.log(`i hear youuuuuuuuuuuuuuuuuuuuu`)
    if (socket.id == socketId1 || socket.id == socketId2) {
      socket.join(newRoomId);
      console.log(`Successfully joined room!`)
    }
  })
});
