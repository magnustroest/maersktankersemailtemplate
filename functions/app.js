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
    console.log(mailOptions)
    console.log("2")
    console.log(transporter.sendMail())
    let send = transporter.sendMail(mailOptions, function (error, info){
      console.log("3")
      if (error) {
        return console.log(error);
      }
      console.log("4")
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    console.log("5")
  } catch (e) {
    console.log(e)
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Goood" })
  };
}