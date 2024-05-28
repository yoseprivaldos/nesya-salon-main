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
      service,
      date,
      startTime,
      endTime,
    } = req.body;

    // validasi user
    const userExist = await User.findById(user);
    if (!userExist) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // validasi service
    const serviceExist = await Service.findById(service);
    if (!serviceExist) {
      return res.status(404).json({ message: "Service tidak ditemukan" });
    }

    //Buat objek reservasi baru
    const newReservation = new Reservation({
      user,
      reservationName,
      reservationEmail,
      note,
      service,
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
      .populate("service", "name price duration");
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
      .populate("service", "name")
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

//getMyReservation (pelanggan), All reservation status ("pending", "confirm", "canceled", "completed")

//confirmReservation(admin), reservation.status => "confirm"
export const confirmReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const matchReservation = await Reservation.findById(reservationId);

    if (!matchReservation) {
      return res.status(404).json({ message: "reservasi tidak tersedia" });
    }
  } catch (error) {}
};
//declineReservation(admin), reservation.status => "canceled"
