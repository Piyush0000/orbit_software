const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"Orbit Admin" <${process.env.SMTP_USER}>`,
        to: to,   // ← THIS IS IMPORTANT
        subject: subject,
        text: text
    });
};

module.exports = { sendEmail };