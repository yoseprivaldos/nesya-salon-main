import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import generalRoutes from "./routes/general.route.js";
import salesRoutes from "./routes/employee.route.js";
import managementRoutes from "./routes/management.route.js";

/*CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**MONGOOSE SETUP */
const PORT = 3000;
mongoose
  .connect(process.env.MONGO || 9000)
  .then(() => {
    console.log("berhasil terhubung dengan mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

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
