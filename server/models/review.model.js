import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User harus ada"],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Layanan harus ada"],
    },
    rating: {
      type: Number,
      required: [true, "Rating harus ada"],
      min: [1, "Rating minimal adalah 1"],
      max: [5, "Rating maksimal adalah 5"],
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
