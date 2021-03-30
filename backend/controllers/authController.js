import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import sendGridMail from "@sendgrid/mail";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

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

// signing user by sending activation email to user's account
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
    { expiresIn: "15m" }
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
        message: `Activation email has been sent to ${email}. Activation link will expire in 15 minutes`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// signing user by sending activation email to admin's account
const signupUserWithSendGridByAdmin = (req, res) => {
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
    { expiresIn: "1d" }
  );

  // creating activating email
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: "Chef's Helper - Account activation",
    html: `
    <h1>Chef Helper account activation</h1>
    <p>Hi user ${name} would like to create an account</p>
    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
    <p>${process.env.CLIENT_URL}</p>
    `,
  };

  // sending an email
  sendGridMail
    .send(emailData)
    .then((sent) => {
      return res.json({
        message: `Account Activation request has been sent to Admin. Please wait for Activation.`,
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

// login user v2
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: "User doesn't exits",
    });
  }

  if (user && (await user.matchPassword(password))) {
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
  } else {
    res.status(401).json({
      error: "Email or password is wrong",
    });
    throw new Error("Invalid email or password");
  }
});

// @desc fetch all user names and ids
// @route GET /api/users
// @access Public

const getUserNames = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1 });
    if (users) {
      res.json(users);
    } else {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  } catch (error) {}
});

// @desc fetch all users data
// @route GET /api/users
// @access Public

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.json(users);
    } else {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  } catch (error) {}
});

// @desc delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({
        message: "User removed",
      });
    } else {
      res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error) {}
});

// @desc get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      // generate token for the client valid for 7 days
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        message: "User profile has been updated",
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("User not found");
  }
});

// @desc    Update user role
// @route   PATCH /api/users/admin/:id
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.role = role;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  signupUser,
  signupUserWithSendGrid,
  signupUserWithSendGridByAdmin,
  accountActivation,
  loginUser,
  authUser,
  getUserNames,
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  updateUserRole,
};
