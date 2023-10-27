// Packeges
const router = require('express').Router();

// Imports
const controller = require('../controllers');
const middleware = require('../middleware');

// Routes
router.get('/:id', controller.UserController.getSingleUser);
router.put(
    '/:id',
    middleware.verifyToken,
    middleware.checkUserAccess,
    controller.UserController.putSingleUser
);
router.patch(
    '/:id/change-password',
    middleware.verifyToken,
    controller.UserController.changeUserPassword
);

// Exports
module.exports = router;
