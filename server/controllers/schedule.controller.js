import Schedule from "../models/schedule.model.js";
import Reservation from "../models/reservation.model.js";

// Mendapatkan semua jadwal
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("reservation");
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

//mendapatkan semua jadwal dalam rentang waktu tertentu
export const getSchedule = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const schedules = await Schedule.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate("reservation");

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSchedule = async (req, res) => {
  const { date, startTime, endTime, type, reservation, notes } = req.body;

  console.log("ini data yang didapatkan dari body", req.body);
  try {
    // Validasi data (opsional, tambahkan validasi lebih lanjut jika perlu)
    if (!date || !startTime || !endTime || !type) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    // Buat objek jadwal baru
    const newSchedule = new Schedule({
      date,
      startTime,
      endTime,
      type,
      reservation: type === "reservation" ? reservation : null, // Hanya isi jika tipe 'reservation'
      notes,
    });

    // Validasi tambahan untuk tipe 'reservation'
    if (type === "reservation" && !reservation) {
      return res.status(400).json({
        message: "Data reservasi harus diisi untuk jadwal tipe reservasi",
      });
    }

    // Simpan jadwal ke database
    const savedSchedule = await newSchedule.save();

    res.status(201).json(savedSchedule); // Kirim jadwal yang baru dibuat sebagai respons
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Memperbarui jadwal berdasarkan ID
export const updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Jadwal tidak ditemukan" });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//menghapus jadwal berdasarkan id
export const deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//menghapus jadwal melalui reservasi id
export const deleteScheduleByReservationId = async (req, res) => {
  const reservationId = req.params.id;
  const { status, reservationMessage } = req.body;
  console.log(reservationId);
  console.log("ini adalah hasil ari:", req.params);

  console.log(req.body);
  try {
    // 1. Cari reservasi berdasarkan ID
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservasi tidak ditemukan" });
    }

    // 2. Cari jadwal yang terkait dengan reservasi tersebut
    const schedule = await Schedule.findOne({
      reservation: reservationId,
      type: "reservation",
    });

    // // 3. Hapus jadwal jika ada
    if (schedule) {
      await schedule.remove();
    }

    // // 4. Perbarui status reservasi menjadi "canceled" (opsional)
    reservation.status = status || reservation.status;
    reservation.reservationMessage =
      reservationMessage || reservation.reservationMessage;
    await reservation.save();

    res.json({ message: "Jadwal berhasil dihapus dan reservasi dibatalkan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
