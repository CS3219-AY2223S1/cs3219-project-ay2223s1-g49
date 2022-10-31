import express from 'express';
import cors from 'cors';
import routes from './routes.js'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 8000

// Controller will contain all the User-defined Routes
app.use('/api/user', routes).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')

})

app.get("/", (_,res) => {
    res.send(`Server live at ${new Date().toUTCString()}`)
})

app.listen(port, () => console.log(`user-service listening on port ${port}`));

export default app