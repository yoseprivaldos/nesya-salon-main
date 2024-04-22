import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "user berhasil dibuat" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return errorHandler(404, "Email belum terdaftar");
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return errorHandler(401, "Password Salah");
  } catch (error) {}
};
// sign out
