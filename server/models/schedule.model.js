import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["reservation", "operational", "additinonal", "holiday"],
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
