const http = require('http')
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const port = 5501
let cors = require("cors")

app.use(cors())

app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.json({limit: "50mb"}));

app.use(bodyParser.json())

app.listen(port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("listening to port 5501")
    }
})

app.post("/sendOrder", (req, res) => {
    console.log(req.body)
    const data = req.body
    sendOrder(data.name, data.email, data.phone, data.productName, data.messenger).catch(console.error);
    res.end()
})


app.post("/sendInterier", (req, res) => {
  const data = req.body
  console.log(data)
  sendInterier(data.name, data.email, data.product, data.interier).catch(console.error)
  res.end()
})


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "iv.artemij@gmail.com",
    pass: "xaybeflyfygvuoqd",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendOrder(name, email, phone, productName, messenger) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Новый заказ" <iv.artemij@gmail.com>', // sender address
    to: "katrin.felice@mail.ru", // list of receivers  katrin.felice@mail.ru
    subject: "Новый заказ", // Subject line
    text: "Email: " + email + "Имя: " + name + "Телефон: " + phone, // plain text body
    html: `<h2>Новый заказ</h2>
    <p><strong>Название товара: ${productName}</strong></p>
    <p>Имя: ${name}</p>
    <p>Email: ${email}</p>
    <p>Телефон: ${phone}</p>
    <br/>
    <p>Удобный мессенджер: ${messenger}</p>`
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}




async function sendInterier(name, email, /*interierImgName, interierImgPath*/ interierProductName, interierData) {
  var interierImg = Buffer.from(interierData).toString('base64');
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Новый запрос на визуализацию картины" <iv.artemij@gmail.com>', // sender address
    to: "iv.artemij@gmail.com", // list of receivers  katrin.felice@mail.ru
    subject: "Новый заказ", // Subject line
    /*text: "Email: " + email + "Имя: " + name + "Телефон: " + phone,*/ // plain text body
    html: `<h2>Новый заказ</h2>
    <p>Имя: ${name}</p>
    <p>Email: ${email}</p>
    <p>Название картины - ${interierProductName}</p>`,
    attachments: [
      {
        filename: "Интерьер от " + name.trim()+".jpg",

        /*content: interierImg*/
        path: interierData
      }
  ]

  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}