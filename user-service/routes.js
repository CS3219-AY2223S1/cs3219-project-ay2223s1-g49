import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import { createUser } from './controller/user-controller.js';

const routes = express.Router()
    routes.post('/signup', createUser)

export default routes 
