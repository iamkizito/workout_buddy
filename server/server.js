require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workoutsRoutes');
const userRoutes = require('./routes/usersRoutes');
const requireAuth = require('./customMiddlewares/requireAuth');

const { Server } = require('socket.io')
const http = require("http")

// Express APP
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(requireAuth)
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body, req.params)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', userRoutes)

// http server and websocket
const httpServer = http.createServer(app)
const io = new Server(httpServer, {cors:{origin: "http://localhost:3001"}})

// websocket Handlers
io.on('connection', (client) => { console.log('fuck me', client.id)});


// db connection and server listening
mongoose.connect(process.env.MONGO_URI)
    .then (() => {
        console.log(`Database connected`)
        httpServer.listen(process.env.SERVER_PORT, () => {
            console.log(`server listening on port ${process.env.SERVER_PORT}`)
        }) 
    })
    .catch ((error) => {
        console.log(error)
    })





