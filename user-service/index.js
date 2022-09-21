import express from 'express';
import cors from 'cors';
import routes from './routes.js'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import { HELLO_WORLD_STRING } from './constants.js';
import cookieParser from 'cookie-parser';

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send(HELLO_WORLD_STRING))

app.use('/api/user', routes).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')

})

app.listen(8000, () => console.log('user-service listening on port 8000'));

export default app