// Packages
const util = require('util');
const multer = require('multer');

// Function
const uploadFile = (fieldName, destinationPath) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `resources/${destinationPath}`);
        },
        filename: (req, file, cb) => {
            const randomNumber = Math.floor(Math.random() * 1000);
            const filename = `${Date.now()}-${randomNumber}-${
                file.originalname
            }`;
            cb(null, filename);
        },
    });

    let upload = multer({
        storage: storage,
    }).single(fieldName);

    let uploadFile = util.promisify(upload);

    return uploadFile;
};

// Exports
module.exports = { uploadFile };
