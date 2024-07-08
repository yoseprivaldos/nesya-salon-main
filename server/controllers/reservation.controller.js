import Reservation from "../models/reservation.model.js";
import Service from "../models/services.model.js";
import User from "../models/user.model.js";

//createReservation
export const createReservation = async (req, res) => {
  try {
    const {
      user,
      reservationName,
      reservationEmail,
      reservationPhoneNumber,
      note,
      services, //Array of service IDs
      totalPrice,
      date,
      startTime,
      endTime,
      status,
      reservationMessage,
    } = req.body;

    console.log(req.body);
    // validasi user
    const userExist = await User.findById(user);

    if (!userExist) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Validasi services (pastikan semua service ID valid)
    const validServiceIds = await Service.find({
      _id: { $in: services },
    }).distinct("_id");

    if (validServiceIds.length !== services.length) {
      return res
        .status(404)
        .json({ message: "Beberapa layanan tidak ditemukan" });
    }
    console.log("disini masih jalan");

    //Buat objek reservasi baru
    const newReservation = new Reservation({
      user,
      reservationName,
      reservationEmail,
      reservationPhoneNumber,
      note,
      services,
      totalPrice,
      date,
      startTime,
      endTime,
      status,
      reservationMessage,
    });
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validasi gagal", errors });
    }
    console.error("detail error", error);
    res
      .status(500)
      .json({ message: "Gagal membuat reservasi", error: error.message });
  }
};

//getAllReservation (admin) => All user
export const getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "_id username email")
      .populate("services", "name price duration");
    if (!reservations) {
      return res.status(404).json({ message: "belum ada reservasi terdaftar" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("error detaiil: ", error);
    res
      .status(500)
      .json({ message: "gagal fetching data reservasi", error: message.error });
  }
};

//getMyReservation(pelanggan), all reservation status
export const getMyReservation = async (req, res) => {
  try {
    // ambil id pengguna dari token autentikasi
    const userId = req.user.id;

    console.log(userId);

    // temukan semua reservasi yang terkait dengan pengguna
    const reservations = await Reservation.find({ user: userId })
      .populate("services", "name price imageService")
      .populate("user", "username");

    console.log("", reservations);

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "Kamu belum membuat reservasi" });
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan ketika mengambil reservasi pengguna",
    });
  }
};

//updateReservation status
export const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    console.log("status yang didapatkan", status);

    // validasi status value
    const validStatuses = [
      "pending",
      "confirmed",
      "canceled",
      "completed",
      "absent",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Statuus tidak valid" });
    }

    //temukan reservasi dari id dan update status
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true, runValidator: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservasi tidak ditemukan" });
    }

    res.status(200).json({
      message: "Status reservasi berhasil diubah",
      reservation: updatedReservation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengubah status reservasi",
      error: error.message,
    });
  }
};

//getServiceReservations //mengambil semua reservasi untuk layanan tertentu
export const getServiceReservation = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Layanan tidak ditemukan" });
    }

    const reservations = await Reservation.find({
      service: serviceId,
    }).populate("user");
    if (!reservations) {
      return res
        .status(404)
        .json({ message: "belum ada reservasi untuk layanan tersebut" });
    }

    res.status(200).json({
      message: "Reservasi layanan berhasil diambil",
      reservations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server saat mengambil reservasi layanan",
      error: error.message,
    });
  }
};

//updateReservation
export const updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const updateData = req.body;
    const userRole = req.user.role;
    const userId = req.user.id;

    console.log(updateData);

    let reservation;

    try {
      reservation = await Reservation.findById(reservationId);
    } catch (findError) {
      console.error("Error finding reservation:", findError);
      return res.status(500).json({ error: "Error saat mencari reservasi" });
    }

    if (!reservation) {
      return res.status(404).json({ error: "Reservasi tidak ditemukan" });
    }

    // Validasi umum: Reservasi yang sudah dibatalkan, selesai, atau absen tidak bisa diubah
    if (["canceled", "completed", "absent"].includes(reservation.status)) {
      return res
        .status(400)
        .json({ error: "Reservasi dengan status tersebut tidak dapat diubah" });
    }

    // Logika untuk admin
    if (userRole === "admin" || userRole === "superadmin") {
      // Admin dapat mengubah semua data jika reservasi dibuat oleh admin itu sendiri
      if (reservation.user._id.toString() === userId) {
        reservation.reservationName =
          updateData.reservationName || reservation.reservationName;
        reservation.reservationEmail =
          updateData.reservationEmail || reservation.reservationEmail;
        reservation.reservationPhoneNumber =
          updateData.reservationPhoneNumber ||
          reservation.reservationPhoneNumber;
        reservation.note = updateData.note || reservation.note;
      }

      reservation.reservationMessage =
        updateData.reservationMessage || reservation.reservationMessage;
      // Admin dapat mengubah status sesuai aturan
      if (
        updateData.status &&
        ["confirmed", "canceled", "completed", "absent"].includes(
          updateData.status
        )
      ) {
        reservation.status = updateData.status;
      }
    }

    // Logika untuk pelanggan
    if (userRole === "pelanggan") {
      // Pastikan pelanggan hanya dapat mengubah reservasi miliknya sendiri
      if (reservation.user._id.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "Anda tidak diizinkan mengubah reservasi ini" });
      }

      // Pelanggan hanya dapat mengubah status dari confirmed/pending ke canceled dan note
      if (
        updateData.status &&
        updateData.status === "canceled" &&
        (reservation.status === "confirmed" || reservation.status === "pending")
      ) {
        reservation.status = updateData.status;
      }
      reservation.note = updateData.note || reservation.note;
      reservation.reservationMessage =
        updateData.reservationMessage || reservation.reservationMessage;
    }

    // Menambahkan reservationMessage jika terjadi perubahan status
    if (updateData.status && updateData.status !== reservation.status) {
      reservation.reservationMessage =
        updateData.reservationMessage || reservation.reservationMessage;
    }

    // Simpan perubahan reservasi
    try {
      await reservation.save();
    } catch (saveError) {
      console.error("Error saving reservation:", saveError);
      return res.status(500).json({ error: "Error saat menyimpan reservasi" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error in updateReservation controller:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

//mendapatkan jumlah total reservasi
export const jumlahReservasi = async (req, res) => {
  try {
    const count = await Reservation.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah reservasi", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Mendapatkan jumlah reservasi berhasil (status confirmed)
export const jumlahReservasiBerhasil = async (req, res) => {
  try {
    const count = await Reservation.countDocuments({ status: "confirmed" });
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah reservasi berhasil", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Mendapatkan jumlah reservasi menunggu (status pending )
export const jumlahReservasiMenunggu = async (req, res) => {
  try {
    const count = await Reservation.countDocuments({ status: "pending" });
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah reservasi menunggu", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Mendapatkan jumlah reservasi absent (status absent)
export const jumlahReservasiAbsent = async (req, res) => {
  try {
    const count = await Reservation.countDocuments({ status: "absent" });
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah reservasi menunggu", error);
    res.status(500).json({ error: "internal Server Error" });
  }
};

//Mendapatkan jumlahReservasi selesai (status completed)
export const jumlahReservasiSelesai = async (req, res) => {
  try {
    const count = await Reservation.countDocuments({ status: "completed" });
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah reservasi selesai:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//Mendapatkan jumlahReservasi selesai (status cancelled)
export const jumlahReservasiBatal = async (req, res) => {
  try {
    const count = await Reservation.countDocuments({ status: "canceled" });
    res.json({ count });
  } catch (error) {
    console.error("Error menghitung jumlah reservasi selesai:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
