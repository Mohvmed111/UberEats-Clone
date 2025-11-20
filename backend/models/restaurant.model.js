import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    image: String,
    address: String,
    location: {
      lat: Number,
      lng: Number,
    },
    categories: [String],
    rating: { type: Number, default: 0 },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzcmadjl1/image/upload/v1696224863/restaurant_default_image_oqs6yq.png",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
