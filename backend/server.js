import express, { urlencoded } from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import GlobalErrorHandling from "./middlewares/errorHandling.js";

// app config
dotenv.config();
const app = express();

// port setup (use environment variable or default to 4000)
const port = process.env.PORT || 4001;

// middlewares
app.use(
  cors({
    origin: "http://localhost:4200", // عنوان Angular
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));
// db connection
connectDB();

// api endpoints
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(GlobalErrorHandling);
// start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
