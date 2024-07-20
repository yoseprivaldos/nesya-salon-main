import express from "express";

import { jumlahPelanggan } from "../controllers/user.controller.js";

import {
  jumlahReservasi,
  jumlahReservasiAbsent,
  jumlahReservasiBerhasil,
  jumlahReservasiMenunggu,
  jumlahReservasiSelesai,
  jumlahReservasiBatal,
} from "../controllers/reservation.controller.js";
import { jumlahService } from "../controllers/services.controller.js";
import { jumlahProduk } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/reservations/all", jumlahReservasi);
router.get("/reservations/completed", jumlahReservasiSelesai);
router.get("/reservations/pending", jumlahReservasiMenunggu);
router.get("/reservations/confirmed", jumlahReservasiBerhasil);
router.get("/reservations/canceled", jumlahReservasiBatal);
router.get("/reservations/absent", jumlahReservasiAbsent);
router.get("/service/all", jumlahService);
router.get("/product/all", jumlahProduk);
router.get("/user/all", jumlahPelanggan);

export default router;
