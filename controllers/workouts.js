const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Workouts = require('../models/workouts')
const mongoose = require("mongoose")

// GET ROUTE
router.get("/", async (req,res) => {
try {
    console.log(res.req.cookies.username)
    const foundList = await Workouts.find({owner: res.req.cookies.username})
    res.json(foundList)
} catch (err) {
    console.log(err)
}

})

// Deletes ALL things in DB
router.delete("/", async (req,res) => {
    try {
        res.json(await Workouts.deleteMany({__v: 0}))
    } catch (error) {
        console.log(error)
    }
})

// CREATE ROUTE
router.post("/", async (req,res) => {
    try {
        req.body[0].owner = res.req.cookies.username
        res.json(await Workouts.create(req.body))
        console.log(req.body)
        console.log("Sucesfully Added a Workout")
    } catch (err) {
        console.log(err)
    }
})


// UPDATE ROUTE
router.put('/:id', async (req,res) => {
    try {
        res.json(await Workouts.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (err) {
        console.log(`The error is ${err}`)
    }
})

// DELETE ROUTE
router.delete("/:id", async (req,res) => {
    try {
        res.json(await Workouts.findByIdAndDelete(req.params.id))
        console.log(`Sucesfully deleted workout`)
    } catch (err) {
        console.log(`The error is ${err}`)
    }
})

module.exports = router