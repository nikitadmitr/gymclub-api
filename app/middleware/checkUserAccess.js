// Imports
const db = require('../models');

// Function
const checkUserAccess = async (req, res, next) => {
    try {
        if (req.userId == req.params.id) {
            next();
        } else {
            res.status(403).json({
                message: 'You do not have access to this resource.',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

// Exports
module.exports = { checkUserAccess };
