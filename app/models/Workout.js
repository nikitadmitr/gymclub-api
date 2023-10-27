// Workout
module.exports = (connection, DataTypes) => {
    const Workout = connection.define('workouts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 255],
                    msg: 'Title must be between 3 and 255 characters',
                },
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [10, 1000],
                    msg: 'Description must be between 10 and 1000 characters',
                },
            },
        },
        price: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            validate: {
                isDecimal: {
                    msg: 'Price must be a valid decimal number',
                },
                min: {
                    args: [0.0],
                    msg: 'Price must be greater than or equal to 0.00',
                },
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    msg: 'Invalid start date format',
                },
            },
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    msg: 'Invalid end date format',
                },
            },
        },
    });

    return Workout;
};
