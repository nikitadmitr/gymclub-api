require('dotenv').config();

// Packages
const router = require('express').Router();

// Imports
const PublicRoutes = require('./PublicRoutes');
const AuthRoutes = require('./AuthRoutes');
const AdminRoutes = require('./AdminRoutes');
const ImageRoutes = require('./ImageRoutes');
const UserRoutes = require('./UserRoutes');
const WorkoutRegistrationRoutes = require('./WorkoutRegistrationRoutes');
const UserFeedbackRoutes = require('./UserFeedbackRoutes');

// Headers
router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    next();
});

// Routes
router.use('/public', PublicRoutes);
router.use('/auth', AuthRoutes);
router.use('/admin', AdminRoutes);
router.use('/images', ImageRoutes);
router.use('/users', UserRoutes);
router.use('/workout-registrations', WorkoutRegistrationRoutes);
router.use('/user-feedback', UserFeedbackRoutes);

// Exports
module.exports = router;
