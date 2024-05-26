import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Anda tidak terautentikasi!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(errorHandler(401, "Token sudah kadaluarsa"));
      }

      return next(errorHandler(403, "Token tidak valid"));
    }

    req.user = user;
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "hanya admin yang bisa melakukan tindakan ini" });
  }
};

export const requirePelanggan = (req, res, next) => {
  if (req.user && req.user.role === "pelanggan") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "hannya pelanggan yang bisa melakukan tindakan ini" });
  }
};
