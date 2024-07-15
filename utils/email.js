const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const AppError = require("./appError");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (res, options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<strong>${options.message}</strong>`,
  };

  if (process.env.NODE_ENV === "development") {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST_DEV,
      port: process.env.EMAIL_PORT_DEV,
      auth: {
        user: process.env.EMAIL_USERNAME_DEV,
        pass: process.env.EMAIL_PASSWORD_DEV,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email sent successfully");
        console.log(info);
      }
    });
  } else if (process.env.NODE_ENV === "production") {
    sgMail
      .send(mailOptions)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
        res.send("Email sent");
      })
      .catch((error) => {
        return res.send(error);
      });
  }
};

module.exports = sendEmail;
