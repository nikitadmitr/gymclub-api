// UserFeedback
module.exports = (connection, DataTypes) => {
    const UserFeedback = connection.define('user_feedback', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Name must be between 3 and 50 characters',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Invalid email format',
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^[0-9]{11}$/,
                    msg: 'Invalid phone number format',
                },
            },
        },
        report: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 2000],
                    msg: 'Report must be between 10 and 2000 characters',
                },
            },
        },
    });

    return UserFeedback;
};
