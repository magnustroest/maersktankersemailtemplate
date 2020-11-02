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

  	var mailOptions = {
	    from: data.from,
	    to: 'maersktankerssupport@test.dk',
	    subject: 'New vessel registration',
      html: `<style>
      th {
      text-align: left;
    }
    th, td {
      padding-right: 15px;
      padding-bottom: 10px;
    }
    table{
      font-family: Arial;
    }
    </style>
    <h1><u>New vessel registration!</u></h1>
          <h2>Vessel details</h2>
          <table>
            <tr>
              <th>Vessel name:</th>
              <td>${data.vesselName}</td>
            </tr>
             <tr>
              <th>Cargo background:</th>
              <td>${data.cargoBackground}</td>
            </tr>
             <tr>
              <th>Pool entry</th>
              <td>${data.poolEntry}</td>
            </tr>
             <tr>
              <th>Vessel location:</th>
              <td>${data.vesselLocation}</td>
            </tr>
          </table>
          <h2>Person information</h2>
          <table>
            <tr>
              <th>Name:</th>
              <td>${data.personName}</td>
            </tr>
             <tr>
              <th>Company name:</th>
              <td>${data.companyName}</td>
            </tr>
             <tr>
              <th>Email:</th>
              <td>${data.email}</td>
            </tr>
             <tr>
              <th>Phone number</th>
              <td>${data.phoneNumber}</td>
            </tr>
          </table>
          `
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