// WorkoutRegistration
module.exports = (connection, DataTypes) => {
    const WorkoutRegistration = connection.define('workout_registrations', {
        registration_date: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: 'Invalid registration date format',
                },
            },
        },
    });

    return WorkoutRegistration;
};
