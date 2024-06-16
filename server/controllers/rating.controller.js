import Rating from "../models/ratingSchema";
import Reservation from "../models/reservation.model";
import User from "../models/user.model";
import Service from "../models/services.model";

export const createRating = async (req, res) => {
  const {
    reservation_id,
    user_id,
    serviceRatings,
    overallRatings,
    additionalComment,
  } = req.body;

  // Validasi input
  if (!reservation_id || !user_id || !serviceRatings || !overallRatings) {
    return res
      .status(400)
      .json({ message: "Data yang diperlukan tidak lengkap." });
  }

  // Validasi apakah reservation_id, user_id dan service_id ada di database
  try {
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
