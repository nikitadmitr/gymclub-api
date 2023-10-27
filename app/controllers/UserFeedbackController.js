// Imports
const db = require('../models');

// Function
const postUserFeedback = async (req, res) => {
    try {
        const { name, email, phone, report } = req.body;

        const feedbackEntry = await db.UserFeedback.create({
            name,
            email,
            phone,
            report,
        });

        res.status(200).json({ message: 'Отзыв успешно сохранен' });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Exports
module.exports = { postUserFeedback };
