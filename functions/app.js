const nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const serverless = require("serverless-http");


const app = express();

const router = express.Router();

//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(`/.netlify/functions/app`, router);

router.post('/send', (req, res) => {
  console.log(req.body)
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
      port: 2525,
      secure: false, 
      auth: {
          user: '7d62218594b137', 
          pass: 'b1e3396000d31d'  
      },
      tls:{
        rejectUnauthorized:false
      }
    });
    let mailOptions = {
        from: 'yes@test.dk', 
        to: req.body.email, 
        subject: 'Node Contact Request', 
        text: 'Hello world?',
        html: output 
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    });
module.exports = app;
module.exports.handler = serverless(app);