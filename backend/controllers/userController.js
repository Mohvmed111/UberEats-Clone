import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../utils/jwt.js";
import { AppError, SuccessResponse } from "../utils/response.js";

// =============================
// 🔥 LOGIN بدون التحقق من الإيميل
// =============================
export async function login(req, res, next) {
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

    // ❌ تم تعطيل التحقق من الإيميل
    searchResult.VerifyState.isVerified = true;

    let payload = { id: searchResult._id };
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

// =============================
// 🔥 REGISTER بدون إرسال Verify Email
// =============================
export async function register(req, res, next) {
  try {
    const { email, password, username } = req.body;

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
      VerifyState: {
        isSent: false,
        isVerified: true,       // 🔥 أهم سطر .. كده الايميل verified تلقائي
        VerifyToken: "",
        lastSend: null
      }
    });

    await user.save();

    res.status(200).json(
      new SuccessResponse(
        true,
        "registration success (email verification disabled)",
        {}
      ).JSON()
    );
  } catch (err) {
    next(err);
  }
}

// =============================
// 🔥 VERIFY اتقفل بالكامل
// =============================
export async function verify(req, res, next) {
  return res.status(200).json(
    new SuccessResponse(true, "Email verification is disabled", {
      nextRoute: "/login"
    }).JSON()
  );
}
