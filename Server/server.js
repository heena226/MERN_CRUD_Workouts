require('dotenv').config()

const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express();

// Middleware

// Use CORS middleware
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB and listening to port:' + process.env.PORT + '!!');
    });
})
.catch((error) => {
    console.log(error)
})


