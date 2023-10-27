// Client
module.exports = (connection, DataTypes) => {
    const Client = connection.define('clients', {});

    return Client;
};
