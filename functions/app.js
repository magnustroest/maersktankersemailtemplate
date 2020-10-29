const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body)
    console.log(data.email)  
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: '7d62218594b137',
        pass: 'b1e3396000d31d'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    console.log("1")
    let mailOptions = {
      from: 'yes@test.dk',
      to: data.email,
      subject: 'Node Contact Request',
      text: 'Hello world?',
    };
    console.log("2")
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  } catch (e) {
    console.log(e)
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Goood" })
  };

}