// Image
module.exports = (connection, DataTypes) => {
    const Image = connection.define('images', {
        path: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: {
                    args: /^\/[a-zA-Z0-9\/_]*$/,
                    msg: 'Invalid path format',
                },
            },
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mimeType: {
            type: DataTypes.STRING,
            defaultValue: 'image/jpeg',
            validate: {
                isIn: {
                    args: [
                        ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'],
                    ],
                    msg: 'Invalid mime type',
                },
            },
        },
    });

    return Image;
};
