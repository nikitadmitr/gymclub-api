// Imports
const db = require('../models');

// Function
const postWorkoutRegistration = async (req, res) => {
    try {
        const { userId, workoutId } = req.body;

        const workout = await db.Workout.findByPk(workoutId);
        const client = await db.Client.findOne({
            where: { user_id: userId },
        });

        if (!client || !workout) {
            return res
                .status(404)
                .json({ message: 'Client or workout not found' });
        }

        await db.WorkoutRegistration.create({
            registration_date: new Date(),
            workout_id: workoutId,
            client_id: client.id,
        });

        res.status(200).json({ message: 'Workout registration successful' });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Function
const deleteWorkoutRegistration = async (req, res) => {
    try {
        const { userId, workoutId } = req.body;

        const workout = await db.Workout.findByPk(workoutId);
        const client = await db.Client.findOne({
            where: { user_id: userId },
        });

        if (!client || !workout) {
            return res
                .status(404)
                .json({ message: 'Client or workout not found' });
        }

        const registration = await db.WorkoutRegistration.findOne({
            where: {
                workout_id: workoutId,
                client_id: client.id,
            },
        });

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        await registration.destroy();

        res.status(200).json({ message: 'Workout registration deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Exports
module.exports = { postWorkoutRegistration, deleteWorkoutRegistration };
