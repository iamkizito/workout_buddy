const express = require('express');
const {getWorkout, getAllWorkouts, createWorkout, updateWorkout, deleteWorkout} = require('../controllers/workoutsController.js')

const router = express.Router()

router.get('/', getAllWorkouts)
router.get('/:id', getWorkout)
router.post('/', createWorkout)
router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router