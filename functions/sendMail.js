var sesAccessKey = '7d62218594b137'
var sesSecretKey = 'b1e3396000d31d'
//https://www.edwardbeazer.com/sending-email-using-nodemailer-using-a-lambda/
 exports.handler = function(event, context, callback) {

  	var nodemailer = require('nodemailer');
  	var smtpTransport = require('nodemailer-smtp-transport');
    const data = JSON.parse(event.body)
  	var transporter = nodemailer.createTransport(smtpTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false,
	    auth: {
	        user: sesAccessKey,
	        pass: sesSecretKey
        },
        tls: {
            rejectUnauthorized: false
          }
  	}));

  	var text = 'Email body goes here';

  	var mailOptions = {
	    from: 'hgw@test.dk',
	    to: data.email,
	    bcc: data.bcc,
	    subject: data.subject,
	    text: data.text
  	};

  	transporter.sendMail(mailOptions, function(error, info){
      if(error){
        const response = {
          statusCode: 500,
          body: JSON.stringify({
            error: error.message,
          }),
        };
        callback(null, response);
      }
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Email processed succesfully!`
        }),
      };
      callback(null, response);
    });
}