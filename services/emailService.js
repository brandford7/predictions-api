import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config();
// Configure Nodemailer for sending email
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_PROVIDER, // Use your email service provider
  auth: {
    user: process.env.MAIL_AD || "your-email-adress", // Your email address
    pass: process.env.MAIL_PASS || "your-email-password", // Your email password or an app-specific password
  },
});

// Send a password reset email
export const sendPasswordResetEmail = (to, resetToken) => {
  const mailOptions = {
    from: process.env.MAIL_ADDRESS, // Sender's email address
    to, // Recipient's email address
    subject: "Password Reset",
    text:
      `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
      `http://localhost:3000/reset-password/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error("Error sending email:", err);
    }
  });
};
