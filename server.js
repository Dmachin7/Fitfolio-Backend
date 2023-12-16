/////////////////////////////
// DEPENDENCIES
////////////////////////////
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
require('dotenv').config()


//////////////////////////////
// MIDDLEWARE
//////////////////////////////
const PORT = process.env.PORT || 3000
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://fit-folio.netlify.app/']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

///////////////////////////////
// CONTROLLERS 
///////////////////////////////

// USER CONTROLLER
const userController = require('./controllers/user.js')

// WORKOUTS CONTROLLER
const workoutsController = require('./controllers/workouts.js')

//////////////////////////////
// DATABASE CONNECTION
//////////////////////////////
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

// connect to mongo 
mongoose.connect(mongoURI)

const db = mongoose.connection

// optional create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})

////////////////////////////////
// ROUTES
////////////////////////////////

// ROUTE TO USER CONTROLLER
app.use('/user', userController )

// ROUTE TO WORKOUTS CONTROLLER
app.use('/workouts', workoutsController)

// BASE GET ROUTE
app.get('/', (req,res) => {
    res.send("Mean Stack Time!")
})

// BASE LISTEN ROUTE
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})