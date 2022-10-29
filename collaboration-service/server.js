import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { createCollab, deleteCollabForUser, getUserDetails } from './collab-controller.js'
const port = process.env.PORT || 3002

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options("*", cors())

app.get('/', (req, res) => {
    res.send('Hello World from collab-service')
});

const httpServer = createServer(app)

httpServer.listen(port)

const io = new Server(httpServer , {cors: { origin : "*"}})

//key: socket.id, value: shared room
var dictionaryCollab = {}

io.on("connection", (socket) => {
    console.log(`client (Backend) connected to collab service with id ${socket.id}`)
    socket.on(`collab`, (collabId, username, difficulty) => {
        console.log(`recieved collab signal from ${username} of room ${socket.id} with collabId: ${collabId}`)
        dictionaryCollab[socket.id] = collabId
        socket.join(collabId)
        createCollab(collabId, username, difficulty)
        socket.emit(`collabSuccess`, collabId)
        listAllConnectedRooms(socket)
    })

    function listAllConnectedRooms(socket) {
        console.log(`__________________Following are the connected rooms for ${socket.id}__________________`)
        socket.rooms.forEach((value) => {
            console.log(value)
        })
        console.log(`___________________________________END_______________________________________________`)
    }

    socket.on(`echo`,(message) => {
        socket.rooms.forEach((value) => {
          io.to(value).emit(`hear`, message)
        })
    })

    socket.on(`quitCollab`, (username) => {
        deleteCollabForUser(username)
        socket.leave(dictionaryCollab[socket.id])
    })

    socket.on('CODE_CHANGED', async (roomId, code) => {
        console.log('someone sent ' + code)
        socket.to(dictionaryCollab[socket.id]).emit('CODE_CHANGED', roomId, code)
        console.log(`something has changed on one end for room ${roomId}    collabRoom: ${dictionaryCollab[socket.id]}`)
    })

    socket.on('getUserDetails', async (username) => {
        const details = await getUserDetails(username)
        socket.emit('getUserDetails', details)
    })
})

export default app;
