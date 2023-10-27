// Packeges
const router = require('express').Router();

// Imports
const controller = require('../controllers');

// Routes
router.get('/workouts', controller.PublicController.getAllWorkouts);
router.get('/trainers', controller.PublicController.getAllTrainers);

// Exports
module.exports = router;
