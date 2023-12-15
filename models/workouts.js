const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutsSchema = Schema({
    name: {type: String, required: true },
    target: String,
    bodyPart: String,
    gifUrl: String,
    equipment: String,
    secondaryMuscles: [{type: String}],
    instructions: [{type: String}],
    owner: String
})

const Workouts = mongoose.model('Workouts', WorkoutsSchema)

module.exports = Workouts