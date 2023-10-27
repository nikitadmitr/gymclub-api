// Imports
const db = require('../models');

// Function
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await db.Workout.findAll({
            include: [
                {
                    model: db.Client,
                    through: db.WorkoutRegistration,
                },
                db.Image,
            ],
        });

        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Function
const getAllTrainers = async (req, res) => {
    try {
        const trainers = await db.Trainer.findAll({
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: ['email', 'password', 'username', 'verified'],
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
module.exports = { getAllWorkouts, getAllTrainers };
