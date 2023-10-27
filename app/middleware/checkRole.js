// Imports
const db = require('../models');

// Function
const checkRole = (role) => async (req, res, next) => {
    try {
        const user = await db.User.findByPk(req.userId);
        const roles = await user.getRoles();

        if (roles.some((r) => r.name === role)) {
            next();
        } else {
            res.status(403).json({
                message: `Require ${role} Role!`,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

// Middleware for Admin Role
const isAdmin = checkRole('admin');

// Exports
module.exports = { isAdmin };
