// Imports
const { verifyToken } = require('./verifyToken');
const {
    checkDuplicateUsernameOrEmail,
} = require('./checkDuplicateUsernameOrEmail');
const { sendMail } = require('./sendMail');
const checkRole = require('./checkRole');
const { checkUserAccess } = require('./checkUserAccess');
const { uploadFile } = require('./uploadFile');

// Exports
module.exports = {
    verifyToken,
    checkRole,
    checkDuplicateUsernameOrEmail,
    sendMail,
    checkUserAccess,
    uploadFile,
};
