import nodemailer from "nodemailer";

// TODO: sending emails not working anymore...

export const sendVerificationEmail = (token, email, name) => {
  const html = `
        <html>
            <body>
                <h3>Dear ${name}</h3>
                <p>Thanks for signing up at Tech Lines!</p>
                <p>Use the link below to verify your email</p>
                <a href='http://localhost:3000/email-verify/${token}'>Click here!</a>
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
    subject: "Verify your email address",
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
