import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username harus ada"],
      unique: [true, "username sudah ada yang pakai"],
    },
    role: {
      type: String,
      enum: ["pelanggan", "karyawan", "pemilik"],
      default: "pelanggan",
    },
    email: {
      type: String,
      required: [true, "email wajib tertera"],
      unique: [true, "email sudah terdaftar"],
    },
    password: {
      type: String,
      required: [true, "password wajib ada"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
