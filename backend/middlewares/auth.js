import { body, validationResult, param } from "express-validator";
import { AppError } from "../utils/response.js";
import { tokenCheck } from "../utils/jwt.js";
import  User  from "../models/user.model.js";
let loginValidators = [
  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Format"),
  body("password").trim().notEmpty().withMessage("Password is required"),

  
];

let registerValidators = [
  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Bad Email Format"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage(
      "Password must contain at least one number or special character , and from length between 6 - 16"
    ),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Password confirm is required")
    .custom((val, { req }) => {
      if (req.body.password !== val) {
        throw "password and confirm must be the same";
      }
      return true;
    }),
  
];

function HandleErrors(req, res, next) {
  let result = validationResult(req);

  if (!result.isEmpty()) {
    let FirstError = result.array({ onlyFirstError: true })[0];
    return next(
      new AppError(FirstError.msg, "ValidationError", FirstError.path, 400)
    );
  }
  next();
}

const verifyValidators = [
  param("token")
    .trim()
    .notEmpty()
    .withMessage("Token required")
    .isJWT()
    .withMessage("Invalid Token"),
  
];

let forgetPasswordValidators = [
  param("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Format"),
  
];
let resetPasswordValidators = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage(
      "Password must contain at least one number or special character , and from length between 6 - 16"
    ),
  ...verifyValidators,
];

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (req.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError(
        "Authorize Token Missing",
        "Unauthorized",
        "header",
        401
      );
    }

    const decoded = tokenCheck(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError("User not found", "Unauthorized", "header", 401);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

function AuthorizeRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      next(new AppError("User not found", "Unauthorized", "header", 401));
      return;
    }
    if (role !== req.user.role) {
      return next(
        new AppError(
          "Forbiden: insufficient permission",
          "Unauthorized",
          "header",
          403
        )
      );
    }
    next();
  };
}


export {
  loginValidators,
  registerValidators,
  verifyValidators,
  authenticate,
  AuthorizeRole,
  forgetPasswordValidators,
  resetPasswordValidators,
  HandleErrors
};
