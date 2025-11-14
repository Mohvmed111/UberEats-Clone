import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: {
      type: String, // مثال: "Home", "Work"
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "Egypt",
    },
    postalCode: {
      type: String,
    },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
