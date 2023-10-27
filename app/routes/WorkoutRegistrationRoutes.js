// Packeges
const router = require('express').Router();

// Imports
const controller = require('../controllers');

// Routes
router.post(
    '/sign-up',
    controller.WorkoutRegistrationController.postWorkoutRegistration
);
router.delete(
    '/',
    controller.WorkoutRegistrationController.deleteWorkoutRegistration
);

// Exports
module.exports = router;
