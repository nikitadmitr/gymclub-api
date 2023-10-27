require('dotenv').config();

// Initialize
const Sequelize = require('sequelize');

const connection = new Sequelize.Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

// Add models
db.User = require('./User')(connection, db.Sequelize.DataTypes);
db.Role = require('./Role')(connection, db.Sequelize.DataTypes);
db.Trainer = require('./Trainer')(connection, db.Sequelize.DataTypes);
db.Client = require('./Client')(connection, db.Sequelize.DataTypes);
db.Membership = require('./Membership')(connection, db.Sequelize.DataTypes);
db.Workout = require('./Workout')(connection, db.Sequelize.DataTypes);
db.WorkoutRegistration = require('./WorkoutRegistration')(
    connection,
    db.Sequelize.DataTypes
);
db.VerificationEmailToken = require('./VerificationEmailToken')(
    connection,
    db.Sequelize.DataTypes
);
db.Image = require('./Image')(connection, db.Sequelize.DataTypes);
db.UserFeedback = require('./UserFeedback')(connection, db.Sequelize.DataTypes);

// Relations
// User M:M Role
db.User.belongsToMany(db.Role, {
    through: 'user_roles',
    foreignKey: 'user_id',
});
db.Role.belongsToMany(db.User, {
    through: 'user_roles',
    foreignKey: 'role_id',
});

// User 1:1 Image
db.User.belongsTo(db.Image, {
    foreignKey: 'image_id',
});

// User 1:1 VerificationEmailToken
db.User.hasOne(db.VerificationEmailToken, {
    foreignKey: 'user_id',
});

// User 1:1 Trainer
db.User.hasOne(db.Trainer, {
    foreignKey: 'user_id',
});

// Trainer 1:1 User
db.Trainer.belongsTo(db.User, {
    foreignKey: 'user_id',
});

// Client 1:1 User
db.User.hasOne(db.Client, {
    foreignKey: 'user_id',
});

// User 1:M Membership
db.User.hasMany(db.Membership, {
    foreignKey: 'user_id',
});

// Trainer 1:M Workout
db.Trainer.hasMany(db.Workout, {
    foreignKey: 'trainer_id',
});

// Client M:M Workout
db.Workout.belongsToMany(db.Client, {
    through: db.WorkoutRegistration,
    foreignKey: 'workout_id',
});
db.Client.belongsToMany(db.Workout, {
    through: db.WorkoutRegistration,
    foreignKey: 'client_id',
});

// Workout 1:1 Image
db.Workout.belongsTo(db.Image, {
    foreignKey: 'image_id',
});

// Export
module.exports = db;
