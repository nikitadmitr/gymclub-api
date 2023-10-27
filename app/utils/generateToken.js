// Packages
const crypto = require('crypto');

// Function
const generateToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};

// Exports
module.exports = { generateToken };
