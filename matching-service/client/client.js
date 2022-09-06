import { io } from "socket.io-client";

const socket = io('http://localhost:8001')
socket.emit('begin-pending-match', 'USER123', 'HARD')