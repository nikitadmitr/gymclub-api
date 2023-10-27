// Packages
const axios = require('axios');

// Constants
const RECAPTCHA_API_URL = 'https://www.google.com/recaptcha/api/siteverify';

// Function
const verifyCaptcha = async (captchaResponse) => {
    try {
        const config = {
            params: {
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: captchaResponse,
            },
        };

        const response = await axios.post(RECAPTCHA_API_URL, null, config);

        return response.data.success;
    } catch (error) {
        return false;
    }
};

// Exports
module.exports = { verifyCaptcha };
