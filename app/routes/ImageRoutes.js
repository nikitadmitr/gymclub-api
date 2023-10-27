// Packages
const router = require('express').Router();

// Imports
const controller = require('../controllers');

// Routes
router.get('/:id', controller.ImageController.getSingleImage);
router.put('/:id', controller.ImageController.putSingleImage);

// Exports
module.exports = router;
