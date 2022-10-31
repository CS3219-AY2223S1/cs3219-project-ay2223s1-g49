import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { createMatch, deleteMatchForUser, getMatchForDifficulty, attemptJoinMatch, getUserDetails } from './controller/match-controller.js';
const port = process.env.PORT || 3001

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
app.options("*", cors());

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app)

httpServer.listen(port);

const io = new Server(httpServer , {cors: { origin : "*"}});

io.on("connection", (socket) => {

  console.log('Client (Backend) connected with id: ' + socket.id)

  socket.on('match', (message) => {
    getMatchForDifficulty(message.difficulty).then(result => {
      if (result == null) {
        createMatch(message, socket.id);
      } else {
        attemptJoinMatch(message, socket, io);
      }
    })
  })

  socket.on(`echo`,(message) => {
    socket.rooms.forEach((value) => {
      io.to(value).emit(`hear`, message)
    })
  })

  socket.on(`timeout`, (message) => {
    deleteMatchForUser(message.username);
  })

  socket.on(`get`, (message) => {
    getMatchForDifficulty(message.difficulty);
  })

  socket.on(`delete`, (message) => {
    deleteMatchForUser(message.username);
  })

  socket.on(`quitMatching`, () => {
    socket.disconnect()
  })

  socket.on(`disconnect`, () => {
    console.log(`socket ${socket.id} has left matching service`)
  })

  socket.on(`getMatchForUser`, async (message) => {
    const username = await getUserDetails(message.username)
    socket.emit(`returnMatchForUser`, username)
  })

});

export default app