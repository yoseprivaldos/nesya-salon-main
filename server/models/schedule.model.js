const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String, // use "HH: MM" format
    required: true,
  },
  endTime: {
    type: String, // use "HH: MM" format
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const scheduleSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlots: [timeSlotSchema],
  isHoliday: {
    type: Boolean,
    default: false,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
