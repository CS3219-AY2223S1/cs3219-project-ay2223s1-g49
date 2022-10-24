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
    res.send('Hello World from chat-service')
});

const httpServer = createServer(app)

httpServer.listen(3003)

const io = new Server(httpServer , {cors: { origin : "*"}})

var myCollabRoom = ""

io.on("connection", (socket) => {
    console.log(`client (Backend) connected to collab service with id ${socket.id}`)
    socket.on(`collab`, (collabId, username, difficulty) => {
        console.log(`recieved collab signal from ${username} of room ${socket.id} with collabId: ${collabId}`)
        myCollabRoom = collabId
        socket.join(collabId)
        createCollab(collabId, username, difficulty)
        socket.emit(`collabSuccess`, collabId)
        listAllConnectedRooms(socket)
    })

    function listAllConnectedRooms(socket) {
        console.log("__________________________")
        socket.rooms.forEach((value) => {
            console.log(value)
        })
        console.log("My current id " + socket.id)
        console.log("__________________________")
    }

    socket.on(`echo`,(message) => {
        socket.rooms.forEach((value) => {
          io.to(value).emit(`hear`, message)
        })
    })

    socket.on(`quitCollab`, (username) => {
        deleteCollabForUser(username)
        socket.leave(myCollabRoom)
    })

    socket.on('CODE_CHANGED', async (roomId, code) => {
        console.log('someone sent ' + code)
        socket.to(myCollabRoom).emit('CODE_CHANGED', roomId, code)
        console.log(`something has changed on one end for room ${roomId}    collabRoom: ${myCollabRoom}`)
    })
})