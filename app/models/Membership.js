// Membership
module.exports = (connection, DataTypes) => {
    const Membership = connection.define('memberships', {
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
                    msg: 'Invalid start date format',
                },
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Price must be an integer',
                },
                min: {
                    args: [0],
                    msg: 'Price must be greater than or equal to 0',
                },
            },
        },
    });

    return Membership;
};
