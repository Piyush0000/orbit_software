const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
  host: env.email.host,
  port: env.email.port,
  secure: false,
  auth: {
    user: env.email.user,
    pass: env.email.pass
  }
});

const sendEmail = async ({ to, subject, html }) => {
  if (!env.email.user) {
    // Skip email sending when SMTP is not configured
    return;
  }
  await transporter.sendMail({
    from: `${env.email.fromName || 'YourSaaS'} <${env.email.fromEmail}>`,
    to,
    subject,
    html
  });
};

const sendWelcomeEmail = (to, name) =>
  sendEmail({
    to,
    subject: 'Welcome to YourSaaS',
    html: `<p>Hi ${name}, welcome aboard!</p>`
  });

const sendPasswordResetEmail = (to, token) =>
  sendEmail({
    to,
    subject: 'Password reset',
    html: `<p>Reset token: ${token}</p>`
  });

const sendVerificationEmail = (to, token) =>
  sendEmail({
    to,
    subject: 'Verify your email',
    html: `<p>Verify using token: ${token}</p>`
  });

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendVerificationEmail
};
