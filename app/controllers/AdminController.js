// Imports
const db = require('../models');

// Function
const getAllTrainers = async (req, res) => {
    try {
        const trainers = await db.Trainer.findAll({
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ['password'],
                    },
                },
            ],
        });

        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Exports
module.exports = { getAllTrainers };
