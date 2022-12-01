require('dotenv').config();

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const createTransporter = () => nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.AWS_USER,
        pass: process.env.AWS_PASSWORD,
    },
});

/**
 * Function to send email
 * @param {object} template - Template to send email
 * @returns boolean
 */

const sendEmail = async (template) => {
    const transporter = createTransporter();
    try {
        const info = await transporter.sendMail(template);
        return info;
    } catch (error) {
        return false;
    }
};

module.exports = {
    sendEmail,
};
