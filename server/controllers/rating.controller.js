import Rating from "../models/ratingSchema.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Service from "../models/services.model.js";

//create rating
export const createRating = async (req, res) => {
  const {
    reservation_id,
    user_id,
    serviceRatings,
    overallRatings,
    additionalComment,
  } = req.body;

  console.log(req.body);

  // Validasi input
  if (!reservation_id || !user_id || !serviceRatings || !overallRatings) {
    return res
      .status(400)
      .json({ message: "Data yang diperlukan tidak lengkap." });
  }

  try {
    // Validasi apakah reservation_id, user_id dan service_id ada di database
    const reservationExists = await Reservation.findById(reservation_id);
    if (!reservationExists) {
      return res.status(404).json({ message: "Reservation tidak ditemukan." });
    }

    const userExists = await User.findById(user_id);
    if (!userExists) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    for (const serviceRating of serviceRatings) {
      const serviceExists = await Service.findById(serviceRating.service_id);
      if (!serviceExists) {
        return res.status(404).json({
          message: `Service dengan ID ${serviceRating.service_id} tidak ditemukan.`,
        });
      }
    }

    // Validasi apakah reservasi sudah pernah diberi rating
    const existingRating = await Rating.findOne({ reservation_id });
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "Reservasi ini sudah diberi rating." });
    }

    // Buat entri rating baru
    const newRating = new Rating({
      reservation_id,
      user_id,
      serviceRatings,
      overallRatings,
      additionalComment,
    });

    // Simpan entri rating baru ke database
    await newRating.save();

    res
      .status(201)
      .json({ message: "Rating berhasil dibuat.", rating: newRating });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// Menampilkan rating yang dibuat oleh user tertentu
export const getRatingsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const ratings = await Rating.find({ user_id });
    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching ratings by user:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// Menampilkan rating untuk reservasi tertentu
export const getRatingsByReservation = async (req, res) => {
  const { reservation_id } = req.params;

  try {
    const rating = await Rating.findOne({ reservation_id });
    if (!rating) {
      return res
        .status(404)
        .json({ message: "Rating untuk reservasi ini tidak ditemukan." });
    }
    res.status(200).json(rating);
  } catch (error) {
    console.error("Error fetching ratings by reservation:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// Menampilkan rating untuk service tertentu
export const getRatingsByService = async (req, res) => {
  const { service_id } = req.params;

  try {
    const ratings = await Rating.find({
      "serviceRatings.service_id": service_id,
    });
    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching ratings by service:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

// Menghitung jumlah rata-rata rating untuk service tertentu
export const getAverageRatingForService = async (req, res) => {
  const { service_id } = req.params;

  try {
    const ratings = await Rating.find({
      "serviceRatings.service_id": service_id,
    });
    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "Rating untuk service ini tidak ditemukan." });
    }

    const totalRatings = ratings.reduce((total, rating) => {
      const serviceRating = rating.serviceRatings.find(
        (sr) => sr.service_id.toString() === service_id
      );
      return total + (serviceRating ? serviceRating.rating : 0);
    }, 0);

    const averageRating = totalRatings / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error fetching average rating for service:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};
