import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import sendGridMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

// @desc Register new user
// @route POST /api/signup/
// @access Public

const signupUser = (req, res) => {
  /* console.log("REQ BODY ON SIGN UP", req.body); */
  // geting data from request body
  const { name, email, password } = req.body;

  // checking database for existing email
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
  });

  // creating new user
  let newUser = new User({ name, email, password });

  newUser.save((err, success) => {
    if (err) {
      console.log("SIGNUP ERROR", err);
      return res.status(400).json({
        error: err,
      });
    }

    res.json({
      message: "Sign-up success! Please sign-in",
    });
  });
};

const signupUserWithSendGrid = (req, res) => {
  // geting data from request body
  const { name, email, password } = req.body;

  // checking database for existing email
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
  });

  // creating token for email activation
  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "10m" }
  );

  // creating activating email
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Account activation link",
    html: `
    <h1>Chef Helper account activation</h1>
    <p>Please use this link to activate your account</p>
    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
    <p>${process.env.CLIENT_URL}</p>
    `,
  };

  // sending an email
  sendGridMail
    .send(emailData)
    .then((sent) => {
      return res.json({
        message: `Activation email has been sent to ${email}. Activation link will expire in 10 minutes`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { signupUser, signupUserWithSendGrid };
