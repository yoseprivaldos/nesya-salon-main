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
    origin: [process.env.CLIENT_URL, "https://www.nesya.online"],
    credentials: true,
  })
);

// Middleware CSP dengan helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'",
        "https://firebasestorage.googleapis.com",
        "https://*.firebaseapp.com",
        "https://*.googleusercontent.com",
        "https://cdn.pixabay.com",
        "data:",
      ],
      connectSrc: [
        "'self'",
        "https://nesya-salon-65393417f4a9.herokuapp.com",
        "https://www.nesya.online",
        "https://apis.google.com",
        "https://firebasestorage.googleapis.com",
        "https://*.firebaseapp.com",
        "https://*.googleusercontent.com",
        "https://www.googleapis.com",
        "wss://*",
      ],
      scriptSrc: [
        "'self'",
        "https://apis.google.com",
        "https://www.gstatic.com",
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      frameSrc: ["'self'", "https://accounts.google.com", "blob:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
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
