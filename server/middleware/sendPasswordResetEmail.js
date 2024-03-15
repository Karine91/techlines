import nodemailer from "nodemailer";

export const sendPasswordResetEmail = (token, email, name) => {
  const html = `
    <html>
        <body>
            <h3>Dear ${name}</h3>
            <p>Please click on the link below to reset your password.</p>
            <a href="http://localhost:3000/password-reset/${token}">Click here!</a>
        </body>
    </html>
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Tech Lines: Reset password request.",
    html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent to ${email}`);
      console.log(info.response);
    }
  });
};
