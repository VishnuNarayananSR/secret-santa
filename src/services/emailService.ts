import nodemailer from "nodemailer";
import { EmailContext, GiverAndReceiver, Participant } from "../types";
import { readFileSync } from "fs";
import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../constants";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
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
      attachments: [
        {
          filename: "logo.png",
          path: path.resolve(__dirname, "../../assets/logo.png"),
          cid: "logo",
        },
      ],
    });
  });

  await Promise.all(emailPromises);
};

export const composeEmailObjects = (
  groupName: string,
  organizer: Participant,
  giverReceiverMap: GiverAndReceiver[]
): EmailContext[] => {
  const santaEmailTemplate = readFileSync(
    path.resolve(__dirname, "../../assets/participantLetterTemplate.html"),
    "utf-8"
  );

  const organizerEmailTemplate = readFileSync(
    path.resolve(__dirname, "../../assets/organizerLetterTemplate.html"),
    "utf-8"
  );

  const santaEmails = giverReceiverMap.map(({ giver, receiver }) => ({
    from: EMAIL_USERNAME,
    to: giver.email,
    subject: "Your secret santa match",
    html: santaEmailTemplate
      .replace(/{{recipient}}/g, giver.name)
      .replace(/{{name}}/g, receiver.name)
      .replace(/{{groupName}}/g, groupName),
  }));
  const organizerEmailObject = {
    from: EMAIL_USERNAME,
    to: organizer.email,
    subject: "Secret santas of this year",
    html: organizerEmailTemplate
      .replace(/{{recipient}}/g, organizer.name)
      .replace(/{{groupName}}/g, groupName)
      .replace(
        /{{table rows}}/g,
        giverReceiverMap
          .map(
            ({ giver, receiver }) =>
              `<tr>
                <td>
                  <p>${giver.name}</p>
                  <p>${giver.email}</p>
                </td>
                <td>
                  <p>${receiver.name}</p>
                  <p>${receiver.email}</p>
                </td>
              </tr>`
          )
          .join("")
      ),
  };
  return [...santaEmails, organizerEmailObject];
};
