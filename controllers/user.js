const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', (req,res) => {
    res.send('You are on the user page!')
})

router.post('/', async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      const newUser = await User.create(req.body)
      req.session.currentUser = newUser
      const sessionUser = req.session.currentUser.username
      console.log(req)
      req.session.username = sessionUser
      res.json("User Created!")
    } catch (err) {
      console.log(err)
    }
    console.log(req.body)
  })


module.exports = router