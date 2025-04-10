import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "imthadhahamed885@gmail.com",
    // user: process.env.EMAIL_USER,
    pass: "agyn dkwl stle jcom",
    // pass: process.env.EMAIL_PASS,
  },
});

export const sendInvitationEmail = async (toEmail, token) => {
  const mailOptions = {
    from: "imthadhahamed885@gmail.com",
    // from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Invitation to Join Organization",
    html: `<p>Click <a href="${process.env.APP_URL}/signup?token=${token}">here</a> to complete your registration</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendInvitationEmail;
