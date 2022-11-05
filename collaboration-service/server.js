import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { createCollab, deleteCollabForUser, getUserDetails } from './collab-controller.js'
import axios from 'axios'
const port = process.env.PORT || 3002

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options("*", cors())

app.get('/', (req, res) => {
    res.send('Hello World from collaboration-service')
});

const httpServer = createServer(app)

httpServer.listen(port)

const io = new Server(httpServer , {cors: { origin : "*"}})

//key: socket.id, value: shared room
var dictionaryCollab = {}

//key: shared room, value: message in room
var dictionarySavedMessage = {}

//key: shared room, value: question id
var dictionarySavedQuestion = {}

function getSharedRoomId(socket) {
    const myId = socket.id
    return dictionaryCollab[myId]
}

function updateSavedMessage(socket, message) {
    const sharedRomId = getSharedRoomId(socket)
    dictionarySavedMessage[sharedRomId] = message
}

function getSavedMessage(socket) {
    const sharedRoomId = getSharedRoomId(socket)
    return dictionarySavedMessage[sharedRoomId]
}

function clearDictionaries(socket) {
    const sharedRoomId = getSharedRoomId(socket)
    dictionaryCollab[socket.id] = ""
    dictionarySavedMessage[sharedRoomId] = ""
    dictionarySavedQuestion[sharedRoomId] = ""
}

function questionExists(socket) {
    const sharedRomId = getSharedRoomId(socket)
    return dictionarySavedQuestion[sharedRomId]
}

io.on("connection", (socket) => {
    console.log(`client (Backend) connected to collab service with id ${socket.id}`)
    socket.on(`collab`, (collabId, username, difficulty, randomQuestionId) => {
        console.log(`recieved collab signal from ${username} of room ${socket.id} with collabId: ${collabId}`)
        dictionaryCollab[socket.id] = collabId
        socket.join(collabId)
        createCollab(collabId, username, difficulty)
        // listAllConnectedRooms(socket)
        if (getSavedMessage(socket) && getSavedMessage(socket) != "") {
            socket.emit('CODE_INIT', getSavedMessage(socket))
        }

        const prevQuestionId = questionExists(socket)

        if (prevQuestionId == null || prevQuestionId == "") {
            dictionarySavedQuestion[collabId] = randomQuestionId
            socket.emit(`collabSuccess`, collabId, randomQuestionId)
        } else {
            socket.emit(`collabSuccess`, collabId, prevQuestionId)
        }

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
        clearDictionaries(socket)
        socket.emit('quitCollabSuccess')
    })

    socket.on('CODE_CHANGED', async (roomId, code) => {
        console.log('someone sent ' + code)
        socket.to(dictionaryCollab[socket.id]).emit('CODE_CHANGED', roomId, code)
        console.log(`something has changed on one end for room ${roomId}    collabRoom: ${dictionaryCollab[socket.id]}`)
        updateSavedMessage(socket, code)
    })

    socket.on('getUserDetails', async (username) => {
        const details = await getUserDetails(username)
        socket.emit('getUserDetails', details)
    })
})

export default app;
