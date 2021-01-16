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

// activating an account

const accountActivation = (req, res) => {
  const { token } = req.body;

  // veryfing the token
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decodedToken) {
        if (err) {
          console.log("JWT Verify Activation Error:", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }

        const { name, email, password } = jwt.decode(token);

        // saving new user
        const user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return res.status(401).json({
              error: "Something went wrong. Please sign up again",
            });
          }
          return res.json({
            message: "User has been added to the database",
          });
        });
      }
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};

// login user

const loginUser = (req, res) => {
  const { email, password } = req.body;
  // check for user in db
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exits",
      });
    }

    // checking password
    if (!user.matchPassword(password)) {
      return res.status(400).json({
        error: "Email or password is wrong",
      });
    }

    // generate token for the client valid for 7 days
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // collecting user data from db
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

export { signupUser, signupUserWithSendGrid, accountActivation, loginUser };
