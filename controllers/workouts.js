const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Workouts = require('../models/workouts')


router.get("/", async (req,res) => {
try {
    const foundList = await Workouts.find({})
    res.send(foundList)
} catch (err) {
    console.log(err)
}

})

router.post("/", async (req,res) => {
    try {
        console.log(req.body)
        res.json(await Workouts.create(req.body))
        console.log("Sucesfully Added a Workout")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router