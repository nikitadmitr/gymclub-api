// Packeges
const router = require('express').Router();

// Imports
const controller = require('../controllers');

// Routes
router.post('/', controller.UserFeedbackController.postUserFeedback);

// Exports
module.exports = router;
