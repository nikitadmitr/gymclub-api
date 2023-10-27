// Imports
const db = require('../models');

// Function
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        const checkUser = async (fieldName, value, errorMessage) => {
            const user = await db.User.findOne({
                where: { [fieldName]: value },
            });
            if (user) {
                return res.status(400).send({
                    message: `Failed! ${errorMessage}`,
                });
            }
        };

        await Promise.all([
            checkUser('username', username, 'Username is already in use!'),
            checkUser('email', email, 'Email is already in use!'),
        ]);

        next();
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
};

// Exports
module.exports = { checkDuplicateUsernameOrEmail };
