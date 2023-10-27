require('dotenv').config();

// Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Imports
const db = require('../models');
const utils = require('../utils');
const { sendMail } = require('../middleware');

// Function
const createUser = async (req, res) => {
    try {
        const { username, email, password, captcha } = req.body;

        if (!(await utils.verifyCaptcha(captcha))) {
            return res
                .status(400)
                .json({ message: 'Captcha verification failed.' });
        }

        const image = await db.Image.create();
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await db.User.create({
            username,
            email,
            password: hashedPassword,
            image_id: image.id,
        });

        const role = await db.Role.findOne({ where: { name: 'user' } });
        if (!role) throw new Error(`Undefined Role.`);
        await user.setRoles([role.id]);

        const token = utils.generateToken();
        await db.VerificationEmailToken.create({
            verification_token: token,
            user_id: user.id,
        });
        const verificationURL = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/auth/${user.id}/verify_email/${token}`;
        await sendMail(user.email, 'Verify Email', verificationURL);

        res.status(201).json({ message: 'User was registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed.' });
    }
};

// Function
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(401)
                .json({ message: 'Invalid username or password!' });
        }

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
        const roles = (await user.getRoles()).map((role) => role.name);

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token,
            roles,
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed.' });
    }
};

// Function
const verifyEmail = async (req, res) => {
    try {
        const { userId, token } = req.params;
        const user = await db.User.findByPk(userId);

        const tokenEntry = await db.VerificationEmailToken.findOne({
            where: { user_id: userId, verification_token: token },
        });

        if (!user || !tokenEntry) {
            return res.status(400).json({ message: 'Invalid link' });
        }

        await db.connection.transaction(async (transaction) => {
            await db.User.update(
                { verified: true },
                { where: { id: userId }, transaction }
            );
            await tokenEntry.destroy({ transaction });
        });

        return res.status(200).json({ message: 'Email verified' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Exports
module.exports = {
    createUser,
    loginUser,
    verifyEmail,
};
