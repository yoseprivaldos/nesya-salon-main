import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  reservation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceRatings: [
    {
      service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: String,
    },
  ],
  overallRatings: {
    pelayanan: { type: Number, required: true, min: 1, max: 5 },
    kebersihan: { type: Number, required: true, min: 1, max: 5 },
    hasil: { type: Number, required: true, min: 1, max: 5 },
  },
  additionalComment: String, // Komentar tambahan secara keseluruhan
  created_at: { type: Date, default: Date.now },
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
