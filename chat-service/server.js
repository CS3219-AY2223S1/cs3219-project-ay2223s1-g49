import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
const port = process.env.PORT || 3003

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options("*", cors())

app.get('/', (req, res) => {
    res.send('Hello World from chat-service')
});

const httpServer = createServer(app)

httpServer.listen(port)

const io = new Server(httpServer , {cors: { origin : "*"}})

//A key value pair containing key: socket.id and value: collabId
const dictionaryCollabIds = {}

io.on("connection", (socket) => {
    console.log(`New Socket Connection ${socket.id}`)

    socket.on("chat", (collabId) => {
      socket.join(collabId)
      dictionaryCollabIds[socket.id] = collabId
    })

    socket.on("chatMessage", (messageObject) => {
      io.in(dictionaryCollabIds[socket.id]).emit('message', messageObject);
    })

})

export default app;