import express from 'express';
import cors from 'cors';
import { auth, block, allow } from './middleware.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import { createUser, authUser, checkUser, logout, validateToken } from './controller/user-controller.js';

const routes = express.Router()
routes.post('/signup', allow, createUser)
routes.post('/login', allow, authUser)
routes.get('/check', block, checkUser)
routes.post('/logout', auth, logout)
routes.post('/validate-token', auth, validateToken)

export default routes 
