const express = require('express')
const app = express()
const session = require('express-session')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')

require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

// setup database 
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

// connect to mongo 
mongoose.connect(mongoURI)

const db = mongoose.connection
// optional create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})


app.get('/', (req,res) => {
    res.send("Mean Stack Time!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})