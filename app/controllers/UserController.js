// Packages
const bcrypt = require('bcryptjs');

// Imports
const db = require('../models');

// Function
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await db.User.findByPk(id, {
            include: [db.Trainer, db.Client, db.Membership],
            attributes: {
                exclude: ['email', 'password', 'username', 'verified'],
            },
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Function
const putSingleUser = async (req, res) => {
    const { id } = req.params;
    const { title, image, ...userData } = req.body;

    try {
        await db.User.update(userData, {
            where: { id },
        });

        if (title) {
            await db.Trainer.update(
                { title },
                {
                    where: { user_id: id },
                }
            );
        }

        res.status(200).json({ message: 'Data successfully updated' });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while updating the data',
        });
    }
};

// Function
const changeUserPassword = async (req, res) => {
    try {
        console.log(req.userId);
        const userId = req.params.id;
        const { oldPassword, newPassword } = req.body;

        const user = await db.User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordIsValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!passwordIsValid) {
            return res
                .status(401)
                .json({ message: 'Old password is incorrect' });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 8);

        user.password = newPasswordHash;
        await user.save();

        res.status(200).json({ message: 'Password successfully changed' });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Exports
module.exports = { getSingleUser, changeUserPassword, putSingleUser };
