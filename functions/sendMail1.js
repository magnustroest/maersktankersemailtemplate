var SMTP_EMAIL_KEY = process.env.SMTP_EMAIL_KEY
var SMTP_PASSWORD_KEY = process.env.SMTP_PASSWORD_KEY
var EMAIL_RECEIVER = process.env.EMAIL_RECEIVER
var SMTP_HOST = process.env.SMTP_HOST
var SECURE_CONNECTION = process.env.SECURE_CONNECTION
var SMTP_PORT = process.env.SMTP_PORT
var TLS_CIPHERS = process.env.TLS_CIPHERS

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};
exports.handler = function (event, context, callback) {
    const createLayout = require('./layout');
    var nodemailer = require('nodemailer');
    const data = JSON.parse(event.body)
    var transporter = nodemailer.createTransport({
        host: SMTP_HOST, // hostname
        secureConnection: SECURE_CONNECTION, // TLS requires secureConnection to be false
        port: parseInt(SMTP_PORT), // port for secure SMTP
        tls: {
            ciphers: TLS_CIPHERS
        },
        auth: {
            user: SMTP_EMAIL_KEY,
            pass: SMTP_PASSWORD_KEY
        }
    });
    const layout = createLayout(data.vesselName, data.cargoBackground, data.poolEntry, data.vesselLocation, data.personName, data.companyName, data.email, data.phoneNumber)
    var mailOptions = {
        from: `"Maersk Tankers 🚢" <${SMTP_EMAIL_KEY}>`,
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
                message: 'Email processed succesfully!'
            }),
        };
        callback(null, response);
    });
}