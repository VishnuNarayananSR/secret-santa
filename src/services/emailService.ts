import nodemailer from "nodemailer";
import { EmailContext, Participant } from "../types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  pool: true,
  maxConnections: 20,
});

export const sendSantaEmails = async (emails: EmailContext[]) => {
  const emailPromises = emails.map((email) => {
    return transporter.sendMail({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
    });
  });

  await Promise.all(emailPromises);
};
