import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../utils/jwt.js";
import { AppError, SuccessResponse } from "../utils/response.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import { tokenCheck } from "../utils/jwt.js";

export default async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    let searchResult = await User.findOne({ email });
    if (!searchResult) {
      await bcrypt.compare(password, "$2b$10$randomstringtostoptimeattacking");
      throw new AppError(
        "Wrong Credentials",
        "VerificationError",
        "Login Fields",
        403
      );
    }

    let isCorrectPassword = await bcrypt.compare(
      password,
      searchResult.password
    );

    if (!isCorrectPassword) {
      throw new AppError(
        "Wrong Credentials",
        "VerificationError",
        "Login Fields",
        403
      );
    }
    if (
      !searchResult.VerifyState.isSent ||
      !searchResult.VerifyState.isVerified
    ) {
      if (searchResult.VerifyState.lastSend < Date.now() - 5 * 60 * 1000) {
        searchResult.VerifyState.VerifyToken = await sendVerificationEmail(
          searchResult.email
        );
        searchResult.VerifyState.lastSend = Date.now();
        await searchResult.save();
      }
      throw new AppError(
        "Email is not verified check your email inbox",
        "notVerified",
        "email",
        403
      );
    }
    let payload = {
      id: searchResult._id,
    };

    let accessToken = tokenGenerator(payload, "10m");
    let refreshToken = tokenGenerator(payload, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "lax",
    });

    res.status(200).json(
      new SuccessResponse(true, "login success", {
        username: searchResult.username,
        role: searchResult.role,
        accessToken,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
}

// async function register(req, res, next) {
//   try {
//     const { email, password, username } = req.body;

//     let isExist = await User.findOne({ email }).lean();
//     if (isExist) {
//       throw new AppError("Email is Already in Use", "EmailReuse", "email", 403);
//     }

//     let HashedPassword = await bcrypt.hash(password, 10);

//     let user = await User.create({
//       email,
//       password: HashedPassword,
//       username,
//       createdAt: Date.now(),
//     });

//     // user.VerifyState.VerifyToken = await sendVerificationEmail(email);
//     // user.VerifyState.isSent = true;
//     // user.VerifyState.lastSend = Date.now();
//     try {
//       const token = await sendVerificationEmail(email);
//       user.VerifyState.VerifyToken = token;
//       user.VerifyState.isSent = true;
//       user.VerifyState.lastSend = Date.now();
//     } catch (err) {
//       console.error("Email sending failed:", err);
//       // ممكن تكمل التسجيل بدون إرسال الايميل أو ترجع خطأ مناسب
//     }

//     await user.save();

//     res
//       .status(200)
//       .json(
//         new SuccessResponse(
//           true,
//           "registration success and email verification sent",
//           {}
//         ).JSON()
//       );
//   } catch (err) {
//     next(err);
//   }
// }
async function register(req, res, next) {
  try {
    const { email, password, username, confirmPassword } = req.body;

    if (!confirmPassword || password !== confirmPassword) {
      throw new AppError(
        "Passwords do not match",
        "PasswordMismatch",
        "password",
        400
      );
    }

    let isExist = await User.findOne({ email }).lean();
    if (isExist) {
      throw new AppError("Email is Already in Use", "EmailReuse", "email", 403);
    }

    let HashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      email,
      password: HashedPassword,
      username,
      createdAt: Date.now(),
    });

    try {
      const token = await sendVerificationEmail(email);
      user.VerifyState.VerifyToken = token;
      user.VerifyState.isSent = true;
      user.VerifyState.lastSend = Date.now();
    } catch (err) {
      console.error("Email sending failed:", err);
    }

    await user.save();

    res
      .status(200)
      .json(
        new SuccessResponse(
          true,
          "registration success and email verification sent",
          {}
        ).JSON()
      );
  } catch (err) {
    next(err);
  }
}

async function verify(req, res, next) {
  try {
    let token = req.params.token;
    let data = tokenCheck(token);
    let user = await User.findOne({ email: data.email }).select("VerifyState");
    if (!user) {
      throw new AppError(
        "Invalid or Expired Token",
        "TokenVerify",
        "Token",
        401
      );
    }
    if (user.VerifyState.isVerified) {
      return res.status(200).json(
        new SuccessResponse(true, "account is already verified", {
          resendRoute: "/login",
        })
      );
    }
    if (user.VerifyState.VerifyToken === token) {
      user.VerifyState.isVerified = true;
      await user.save();

      res.status(200).json(
        new SuccessResponse(true, "verification success", {
          nextRoute: "/login",
        }).JSON()
      );
    } else {
      throw new AppError(
        "Invalid or Expired Token",
        "TokenVerify",
        "Token",
        401
      );
    }
  } catch (e) {
    next(e);
  }
}

export { login, register, verify };
