import User from "../models/userModel.js";

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

export { signupUser };
