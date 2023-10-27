// Packeges
const router = require('express').Router();

// Imports
const controller = require('../controllers');
const middleware = require('../middleware');

// Routes
router.get(
    '/trainers',
    middleware.verifyToken,
    middleware.checkRole.isAdmin,
    controller.AdminController.getAllTrainers
);

// Exports
module.exports = router;
