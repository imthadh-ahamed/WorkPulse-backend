import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendInvitationEmail = async (toEmail, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Invitation to Join Organization",
    html: `<p>Click <a href="${process.env.APP_URL}/signup?token=${token}">here</a> to complete your registration</p>`,
  };

  await transporter.sendMail(mailOptions);
};
