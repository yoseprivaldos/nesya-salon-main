import mongoose from "mongoose";

const serviceStatSchema = new mongoose.Schema(
  {
    serviceId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnites: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnites: Number,
      },
    ],
    dailyData: {
      date: String,
      totalSales: Number,
      totalUnits: Number,
    },
  },
  {
    timestamps: true,
  }
);

const serviceStat = mongoose.model("serviceStat", serviceStatSchema);

export default serviceStat;
