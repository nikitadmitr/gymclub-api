require('dotenv').config();

// Packages
const express = require('express');

// Imports
const routes = require('./app/routes');
const db = require('./app/models');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Initialization
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Database
db.connection.sync({ force: true }).then(async () => {
    console.log('Resync DB');
    await require('./dbMocks')(db);
});
