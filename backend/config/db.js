import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://UberEats:33225544@cluster0.hwjbk1l.mongodb.net/UberEats"
    )
    .then(() => console.log("DB connected"));
};
