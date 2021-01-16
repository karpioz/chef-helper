import { check } from "express-validator";

const userSignUpValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email address is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),
];
const userLoginValidator = [
  check("email").isEmail().withMessage("Valid email address is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters"),
];

export { userSignUpValidator, userLoginValidator };
