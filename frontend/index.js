const express = require('express')
const path = require('path')

const app = express();


const port = process.env.PORT || 8081

app.use(express.static('./build'))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'))
})

app.listen(port)

module.exports = app