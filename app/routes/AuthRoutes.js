// Packages
const router = require('express').Router();

// Imports
const controller = require('../controllers');
const middleware = require('../middleware');

// Routes
router.post(
    '/signup',
    middleware.checkDuplicateUsernameOrEmail,
    controller.AuthController.createUser
);
router.post('/signin', controller.AuthController.loginUser);
router.get(
    '/:userId/verify_email/:token',
    controller.AuthController.verifyEmail
);

// Exports
module.exports = router;
