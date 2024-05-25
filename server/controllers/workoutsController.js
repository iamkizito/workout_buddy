const Workout = require("../models/workoutsModel.js")

const getAllWorkouts = async (req, res) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({error: "unauthenticated request"})
    }

    try {
        const workouts = await Workout.find({user_id: req.user._id})
        res.status(200).json({mssg: "ok", workouts})
    }catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const getWorkout = async (req, res) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({error: "unauthenticated request"})
    }

    try {
        const workout = await Workout.findOne({_id:req.params.id, user_id:req.user._id})
        res.status(200).json({mssg: "ok", workout})
    }catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const createWorkout = async (req, res) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({error: "unauthenticated request"})
    }

    const {title, reps, load} = req.body

    try {
        const workout = await Workout.create({title, reps, load, user_id:req.user._id})
        res.status(200).json({mssg: "ok", workout})
    }catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const updateWorkout = async (req, res) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({error: "unauthenticated request"})
    }

    try {
        const workout = await Workout.findOneAndUpdate({user_id:req.user._id, _id:req.params.id}, {...req.body})
        res.status(200).json({mssg: "ok", workout})
    }catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({error: "unauthenticated request"})
    }

    try {
        const workout = await Workout.deleteOne({_id:req.params.id, user_id:req.user._id})
        res.status(200).json({mssg: "ok", workout})
    }catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}


module.exports = {
    getAllWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout
}

