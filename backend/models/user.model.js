import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val) => {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
        },
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "restaurant", "driver", "admin"],
      default: "customer",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },

    phone: String,
    createdAt: { type: Date, default: Date.now },
    resetPassword: {
      expiredIn: Date,
      token: String,
    },
    VerifyState: {
      isSent: {
        type: Boolean,
        default: false,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      VerifyToken: {
        type: String,
        default: null,
      },
      lastSend: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
