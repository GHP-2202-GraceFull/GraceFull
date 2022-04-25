const nodemailer = require('nodemailer');
let transporter =nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '12a54b60da2461',
        pass: 'fdd77e60e71fb0'
    }
})

let message = {
    from: "from-example@email.com",
    to: "laurynnlowe@gmail.com",
    subject: "Subject",
    text: "Hello SMTP Email"
    //could use html: "<h1>Hello SMTP email</h1>"
}

const sendEmail = transporter.sendMail(message, (err, info)=> {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
})

export default sendEmail;