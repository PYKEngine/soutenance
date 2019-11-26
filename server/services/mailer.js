const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(output) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "pykengine.dev",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "admin@pykengine.dev", // generated ethereal user
      pass: "1dWog%52" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"PYKEngine 👻" <admin@pykengine.dev>', // sender address
    to: output.to, // list of receivers
    subject: output.subject, // Subject line
    text: "PYKEngine mail service", // plain text body
    html: output.body // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { sendEmail }
