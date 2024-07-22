import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import serviceRoutes from "./routes/service.route.js";
import productRoutes from "./routes/product.route.js";
import employeeRoutes from "./routes/employee.route.js";
import reservationRoutes from "./routes/reservation.route.js";
import scheduleRoutes from "./routes/schedule.route.js";
import statsRoutes from "./routes/stats.routes.js";
import ratingRoutes from "./routes/rating.route.js";
import emailRoutes from "./routes/email.routes.js";
import reportRoutes from "./routes/report.route.js";

/* CONFIGURATION */
dotenv.config();

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;

// MIDDLEWARE SETUP
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Sumber default yang diizinkan adalah domain itu sendiri
      imgSrc: [
        "'self'",
        "https://firebasestorage.googleapis.com", // Domain untuk gambar Firebase
        "https://*.firebaseapp.com", // Domain untuk Firebase
        "https://*.googleusercontent.com", // Domain untuk Google
        "data:", // Untuk gambar base64 jika diperlukan
      ],
      connectSrc: [
        "'self'",
        "https://apis.google.com", // Domain untuk Google OAuth
        "https://firebasestorage.googleapis.com", // Domain untuk Firebase API
        "https://*.firebaseapp.com", // Domain untuk Firebase API
        "https://*.googleusercontent.com", // Domain untuk Google API
        "https://www.googleapis.com", // Domain tambahan untuk API Google
        "wss://*",
      ],
      scriptSrc: [
        "'self'",
        "https://apis.google.com", // Domain untuk skrip Google OAuth
        "https://www.gstatic.com", // Skrip Google tambahan
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Jika menggunakan style inline, pastikan untuk menambahkan ini
        "https://fonts.googleapis.com", // Domain untuk Google Fonts
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com", // Domain untuk font Google
      ],
      frameSrc: [
        "'self'",
        "https://accounts.google.com", // Domain untuk Google OAuth
      ],
      objectSrc: ["'none'"], // Mencegah penggunaan <object>, <embed>, atau <applet>
      frameAncestors: ["'self'"], // Mencegah situs dari menempatkan konten Anda dalam frame atau iframe
    },
  })
);

// Log environment and paths
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Path to build:", path.join(__dirname, "public"));

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/report", reportRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "public")));

  // Catch-all handler to serve React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
      if (err) {
        console.error("Error serving index.html:", err);
        res.status(500).send(err);
      }
    });
  });
}

// ERROR HANDLING
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

/** MONGOOSE SETUP */
mongoose
  .connect(process.env.MONGO, {})
  .then(() => {
    console.log("berhasil terhubung dengan mongodb");
    app.listen(PORT, () => {
      console.log(`APP LISTENING ON http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
