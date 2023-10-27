// User
module.exports = (connection, DataTypes) => {
    const User = connection.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username is already in use',
            },
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Username must be between 3 and 50 characters',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email is already in use',
            },
            validate: {
                isEmail: {
                    msg: 'Invalid email format',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        first_name: {
            type: DataTypes.STRING,
            defaultValue: 'Name',
            validate: {
                len: {
                    args: [2, 50],
                    msg: 'First name must be between 2 and 50 characters',
                },
            },
        },
        second_name: {
            type: DataTypes.STRING,
            defaultValue: 'Surname',
            validate: {
                len: {
                    args: [2, 50],
                    msg: 'Second name must be between 2 and 50 characters',
                },
            },
        },
        patronymic: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [2, 50],
                    msg: 'Patronymic must be between 2 and 50 characters',
                },
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 2000],
                    msg: 'Description must be at most 2000 characters',
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
        vk_link: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Invalid VK link format',
                },
            },
        },
        youtube_link: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Invalid YouTube link format',
                },
            },
        },
        instagram_link: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    msg: 'Invalid Instagram link format',
                },
            },
        },
    });

    return User;
};
