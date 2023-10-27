// Packages
const fs = require('fs');
const path = require('path');

// Imports
const db = require('../models');
const middleware = require('../middleware');

// Function
const getSingleImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await db.Image.findByPk(id);

        if (!image) {
            return res.status(404).send('Image not found');
        }

        const imageFilePath = path.join(
            process.env.ABSOLUTE_PATH,
            'resources/images',
            image.path,
            image.filename
        );

        if (fs.existsSync(imageFilePath)) {
            const imageFile = fs.readFileSync(imageFilePath);
            res.setHeader('Content-Type', image.mimeType);
            res.send(imageFile);
        } else {
            throw new Error();
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Function
const putSingleImage = async (req, res) => {
    try {
        await middleware.uploadFile('image', 'images/avatars')(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: 'Please upload a file!' });
        }

        const newFilename = req.file.filename;
        const imageId = req.params.id;

        const image = await db.Image.findByPk(imageId);

        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }

        const oldFilePath = path.join(
            process.env.ABSOLUTE_PATH,
            '/resources/images',
            String(image.path) || '/',
            String(image.filename)
        );

        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }

        const updatedImage = await db.Image.update(
            { filename: newFilename },
            { where: { id: imageId } }
        );

        if (updatedImage[0] === 1) {
            res.status(200).send({
                message: 'Uploaded the file successfully: ' + newFilename,
            });
        } else {
            res.status(404).send({ message: 'Image not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Exports
module.exports = { getSingleImage, putSingleImage };
