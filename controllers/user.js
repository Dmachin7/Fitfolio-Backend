const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

router.get('/', (req,res) => {
    res.send('You are on the user page!')
})

router.post('/register', async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      const user = await User.create(req.body)
      const {password, ...data} = await user.toJSON()
      res.send(data)
    } catch (err) {
      console.log(err)
    }
  })


router.post('/login', async (req,res) => {
  const user = await User.findOne({username: req.body.username})

  const {password, ...data} = await user.toJSON()

  if (!user) {
    return res.status(404).send({
      message: 'user not found'
    })
  }

  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res.status(404).send({
      message: 'Invalid Login'
    })
  }

  const token = jwt.sign({_id: user._id}, process.env.SECRET)

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.cookie(`username`, data.username, {
    httpOnly: true,
    maxAge: 24 * 60* 60 * 1000
  })

  res.send({
    message: "Success"
  })

})

router.get('/auth', async (req,res) => {
  try {


  const cookie = req.cookies['jwt']

  const claims = jwt.verify(cookie, process.env.SECRET)

  if(!claims) {
    return res.status(404).send({
      message: 'Not Authenticated'
    })
  }

  const user = await User.findOne({_id: claims._id})

  const {password, ...data} = await user.toJSON()

  res.send(data)
} catch (e) {
  return res.status(401).send({
    message: "unauthorized"
  })
}
})

router.post('/logout', async(req,res) => {
  res.cookie('jwt', '', {maxAge: 0})
  res.cookie('username', '', {maxAge: 0})

  res.send({
    message: "Sucesfully Logged Out"
  })
})


module.exports = router