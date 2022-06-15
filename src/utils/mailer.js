const nodemailer = require("nodemailer");

const sendEmail = (info) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    address: "imap.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: process.env.GMAIL,
    to: info.to,
    subject: info.subject,
    html: info.text,
  };
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log("mail erorrrrrrrrrrr");
      console.log(err);
      return;
    } else {
      console.log("mail infoooooo");

      console.log(info);
    }
  });
};

module.exports = sendEmail;
