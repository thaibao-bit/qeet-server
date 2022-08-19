const bodyParser = require('body-parser')
const express = require('express')
const  mongoose = require('mongoose')
const morgan = require('morgan')
const { response } = require('../../ReactProject/NodeJS/learn-node-server/app')
require('dotenv').config()

const userRoute = require('./api/routes/user.router')
const qeetRoute = require('./api/routes/qeet.router')

const app = express()


mongoose.connect(process.env.MONGO_LINK, {useNewUrlParser: true})
const con = mongoose.connection
con.on('open', ()=>{
    console.log("Mongodb is connected")
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/uploads',express.static('./uploads'))

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "localhost:9000")
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept")

    if(request.method === "OPTIONS"){
        const allowedMethod = "GET, POST, PUT, PATCH, DELETE"
        response.header("Access-Control-Allow-Methods", allowedMethod)
        return response.status(200).send(allowedMethod)
    }
    next()
})

// routes from here
app.use("/auth",userRoute)
app.use("/qeet",qeetRoute)
// to here

app.use((request, response, next)=> {
    const error = new Error("Not found")
    error.status =404
    next(error)
})
app.use((error, request, response, next)=> {
    response.status(error.status || 500)
    response.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app