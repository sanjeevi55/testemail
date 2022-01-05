const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5002;
const path = require("path");
var bodyParser = require("body-parser");
var formvalue = "";
var stri = "";
const app = express(); //instance for express
var nodemailer = require("nodemailer");
//api middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
//api routes
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/formPost", (req, res) => {
  try {
    var formvalue = req.body;
    var stri = JSON.stringify(formvalue);
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
      from: "ramaiah.m@spritle.com",
      to: "rameshmariappan.m@gmail.com",
      subject: "Form was Filled",
      text: `Name : ${formvalue.fname} \nCompany Name: ${formvalue.company_name} \nEmail: ${formvalue.email_address} \nPhone no: ${formvalue.phone_number} \nMessage: ${formvalue.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send("THANKYOU!!!!! FOR SUBMITTING FORM");
  } catch (err) {
    res.status(404).send(err);
  }
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
