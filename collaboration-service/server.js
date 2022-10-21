import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { createCollab, deleteCollabForUser } from './collab-controller.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options("*", cors())

app.get('/', (req, res) => {
    res.send('Hello World from collab-service')
});

const httpServer = createServer(app)

httpServer.listen(3002)

const io = new Server(httpServer , {cors: { origin : "*"}})

io.on("connection", (socket) => {
    console.log(`client (Backend) connected to collab service with id ${socket.id}`)

    socket.on(`collab`, (collabId, username, difficulty) => {
        console.log(`recieved collab signal from ${username} with collabId: ${collabId}`)
        socket.join(collabId)
        createCollab(collabId, username, difficulty)
        socket.emit(`collabSuccess`, collabId)
    })

    socket.on(`echo`,(message) => {
        socket.rooms.forEach((value) => {
          io.to(value).emit(`hear`, message)
        })
    })

    socket.on(`quitCollab`, (collabId, username) => {
        deleteCollabForUser(username)
        socket.leave(collabId)
    })

    socket.on('CODE_CHANGED', async (roomId, code) => {
        collabSocket.to(roomId).emit('CODE_CHANGED', code)
    })
})