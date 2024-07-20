import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Terjadi Kesalahan dalam mengambil data user" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error Nih" });
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "Kamu hanya bisa update akun milik sendiri!")
    );
  }
  try {
    if (req.body.password && req.body.password.trim() !== "") {
      // Tambahan pengecekan trim untuk mengatasi spasi
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    } else {
      // Jika password tidak diubah, hapus dari data yang akan diupdate
      delete req.body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Cukup kirim req.body, sudah difilter
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "Kamu hanya bisa menghapus akun sendiri!!!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User berhasil di hapus");
  } catch (error) {
    next(error);
  }
};
// Controller untuk mendapatkan semua user dengan role "admin"
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: { $in: ["admin", "superadmin"] },
    }); // Cari user dengan role "admin"
    res.status(200).json(admins); // Kirim data admin dalam format JSON
  } catch (error) {
    console.error("Error fetching admins:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data admin" });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const adminIdToUpdate = req.params.id; // ID admin yang akan diupdate dari URL
    const currentUser = req.user; // Data user yang sedang login (dari middleware otentikasi)

    console.log("data dari params", req.params);
    console.log("Updating admin widh ID: ", adminIdToUpdate);

    // Validasi authorization:
    if (
      currentUser.role !== "admin" &&
      currentUser.role !== "superadmin" &&
      currentUser._id.toString() !== adminIdToUpdate // Pastikan admin hanya bisa update dirinya sendiri
    ) {
      return res.status(403).json({ message: "Tidak diizinkan" });
    }

    // Ambil data update dari body request

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update data admin
    const updatedAdmin = await User.findByIdAndUpdate(
      adminIdToUpdate,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin tidak ditemukan" });
    }

    const { password, ...rest } = updatedAdmin._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = req.user;

    //validasi peran superadmin
    if (!currentUser || currentUser.role !== "superadmin") {
      return res.status(403).json({
        message: "Hanya super admin yang diperbolehkan menghapus admin",
      });
    }

    // Cari dan hapus user admin
    const deletedUser = await User.findOneAndDelete({
      _id: userId,
      role: "admin",
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "Admin tidak ditemukan" });
    }
    res.status(200).json({ message: "Admin berhasil dihapus" });
  } catch (error) {
    console.error("Error menghapus user admin:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const jumlahPelanggan = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "pelanggan" });
    res.json({ count });
  } catch (error) {
    console.error("Gagal menapatkan jumlah pelanggan", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
