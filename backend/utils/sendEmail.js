import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import { errorLogger } from "./logger.js";
import { tokenGenerator } from "./jwt.js";
import { AppError } from "./response.js";
dotenv.config();

export async function sendEmail(SendTo, subject, message) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: SendTo,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
  
    throw new AppError(
      "Failed to send email, please try again later",
      "InternlError",
      "unknown",
      500
    );
  }
}

 export default async function sendVerificationEmail(email) {
  const token = tokenGenerator({ email }, "5m");

  const verificationLink = `${process.env.CLIENT_URL}/users/verify/${token}`;
  const message = `Click the link below to activate your account:\n${verificationLink}`;

   await sendEmail(email, "Verification Email", message);
   return token ;
}

   async function sendForgetPasswordEmail(email , id) {
  const token = tokenGenerator({ id }, "10m");
  
  const resetUrl = `${process.env.CLIENT_URL}/users/resetPassword/${token}`;
  const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;
  
  await sendEmail(email, "Password Reset", message);
  return token ;
}


export { sendVerificationEmail , sendForgetPasswordEmail };
