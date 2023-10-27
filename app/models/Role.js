// Role
module.exports = (connection, DataTypes) => {
    const Role = connection.define('roles', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Role name must be between 3 and 50 characters',
                },
            },
        },
    });

    return Role;
};
