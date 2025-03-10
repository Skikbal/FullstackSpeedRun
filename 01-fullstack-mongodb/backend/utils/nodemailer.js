import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const sendMail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.MAILTRAP_USERNAME,
      to,
      subject,
      text,
      html,
    };

    const info = await transport.sendMail(mailOptions);

    return info;
  } catch (err) {
    throw new Error("Failed to send email");
  }
};

export default sendMail;
