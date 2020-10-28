const nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const serverless = require("serverless-http");


const app = express();

const router = express.Router();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

app.use(`/.netlify/functions/app`, router);

router.get('/', (req, res) => {

    res.render('./contact', { layout: false });
});

router.post('/send', (req, res) => {
  console.log("1")
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
    console.log("2")

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
    console.log("3")

    let mailOptions = {
        from: 'yes@test.dk', 
        to: req.body.email, 
        subject: 'Node Contact Request', 
        text: 'Hello world?',
        html: output 
    };
    console.log("4")

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    });
  
  //app.listen(3000, () => console.log('Server started...'));
  module.exports = app;
module.exports.handler = serverless(app);