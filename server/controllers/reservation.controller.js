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
      note,
      services, //Array of service IDs
      date,
      startTime,
      endTime,
    } = req.body;

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

    //Buat objek reservasi baru
    const newReservation = new Reservation({
      user,
      reservationName,
      reservationEmail,
      note,
      services,
      date,
      startTime,
      endTime,
    });
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validasi gagal", errors });
    }
    console.log(error);
    res.status(500).json({ message: "Gagal membuat reservasi", error });
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
    console.error(error);
    res.status(500).json({ message: "gagal fetching data reservasi", error });
  }
};

//getMyReservation(pelanggan), all reservation status
export const getMyReservation = async (req, res) => {
  try {
    // ambil id pengguna dari token autentikasi
    const userId = req.user.id;

    // temukan semua reservasi yang terkait dengan pengguna
    const reservations = await Reservation.find({ user: userId })
      .populate("services", "name price imageService")
      .populate("user", "username");

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

    // validasi status value
    const validStatuses = ["pending", "confirm", "canceled", "completed"];
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

//setelah buat review model
//addReviewToReservation
