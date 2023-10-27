// Trainer
module.exports = (connection, DataTypes) => {
    const Trainer = connection.define('trainers', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Title must be between 3 and 50 characters',
                },
            },
        },
    });

    return Trainer;
};
