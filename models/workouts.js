const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutsSchema = Schema({
    title: {type: String, required: true },
    category: String,
    reps: String
})

const Workouts = mongoose.model('Workouts', WorkoutsSchema)

module.exports = Workouts