import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("berhasil terhubung dengan mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/s/user", userRoutes);
app.use("/s/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`APP LISTENING ON http://localhost:${PORT}`);
});
