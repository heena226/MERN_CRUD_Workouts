const express = require('express');

const {createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController')

const Workout = require("../models/WorkoutModel")

const router = express.Router()

// Get all workouts
router.get('/', getAllWorkouts)

// Get one workout
router.get('/:id', getWorkout)

// Post a new workout
router.post('/', createWorkout)

// Delete a new workout
router.delete('/:id', deleteWorkout)

// Update a new workout
router.patch('/:id', updateWorkout)
module.exports = router;