var sesAccessKey = 'matroest@hotmail.com'
var sesSecretKey = 'Magnus100'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};
//https://www.edwardbeazer.com/sending-email-using-nodemailer-using-a-lambda/
exports.handler = function (event, context, callback) {
  const createLayout = require('./layout');
  var nodemailer = require('nodemailer');
  const data = JSON.parse(event.body)
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: sesAccessKey,
        pass: sesSecretKey
    }
  });
  const layout = createLayout(data.vesselName, data.cargoBackground, data.poolEntry, data.vesselLocation, data.personName, data.companyName, data.email, data.phoneNumber)
  var mailOptions = {
    from: 'matroest@hotmail.com',
    to: 'mmt@hellogreatworks.com',
    subject: 'New vessel registration',
    html: layout   
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({
          error: error.message,
        }),
      };
      callback(null, response);
    }
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({
        message: `Email processed succesfully!`
      }),
    };
    callback(null, response);
  });
}