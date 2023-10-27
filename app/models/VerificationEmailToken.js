// VerificationEmailToken
module.exports = (connection, DataTypes) => {
    const VerificationEmailToken = connection.define(
        'verification_email_tokens',
        {
            verification_token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    );

    return VerificationEmailToken;
};
