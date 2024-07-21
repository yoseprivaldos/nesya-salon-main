/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { Box } from "@mui/system";
import Header from "../../components/dashboard/Header";
import { Grid, Typography } from "@mui/material";
import {
  useGetJumlahReservasiQuery,
  useGetJumlahReservasiBerhasilQuery,
  useGetJumlahReservasiBatalQuery,
  useGetJumlahReservasiMenungguQuery,
  useGetJumlahReservasiAbsentQuery,
  useGetJumlahReservasiSelesaiQuery,
  useGetJumlahPelangganQuery,
  useGetJumlahServiceQuery,
  useGetJumlahProdukQuery,
} from "../../redux/api/api.js";
import StatBox from "../../components/dashboard/StatBox";
import TrafficIcon from "@mui/icons-material/Traffic";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import GroupIcon from "@mui/icons-material/Group";
import CachedIcon from "@mui/icons-material/Cached";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Inventory } from "@mui/icons-material";

const Dashboard = () => {
  const { data: jumlahPelanggan } = useGetJumlahPelangganQuery();
  const { data: jumlahReservasi } = useGetJumlahReservasiQuery();
  const { data: jumlahReservasiSelesai } = useGetJumlahReservasiSelesaiQuery();
  const { data: jumlahReservasiBerjalan } =
    useGetJumlahReservasiMenungguQuery();
  const { data: jumlahReservasiBerhasil } =
    useGetJumlahReservasiBerhasilQuery();
  const { data: jumlahReservasiBatal } = useGetJumlahReservasiBatalQuery();
  const { data: jumlahReservasiGagal } = useGetJumlahReservasiAbsentQuery();
  const { data: jumlahService } = useGetJumlahServiceQuery();
  const { data: jumlahProduk } = useGetJumlahProdukQuery();
  return (
    <Box m={"0.5rem 2.5rem"}>
      <Box>
        <Header title="HALAMAN DASHBOARD"></Header>
      </Box>

      {/* Grid Charts */}
      <Box
        mt={4}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="110px"
        gap="20px"
      >
        {/* row satu */}
        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahPelanggan?.count}
            subtitle="Total Pelanggan"
            icon={
              <GroupIcon sx={{ color: "secondary.main", fontSize: "50px" }} />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahReservasi?.count}
            subtitle="Total Reservasi"
            icon={<BookmarksIcon sx={{ color: "#white", fontSize: "50px" }} />}
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahReservasiSelesai?.count}
            subtitle="Reservasi Selesai"
            icon={
              <PublishedWithChangesIcon
                sx={{ color: "blue", fontSize: "50px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahReservasiBerjalan?.count}
            subtitle="Reservasi Belum Diproses"
            icon={<CachedIcon sx={{ color: "orange", fontSize: "50px" }} />}
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahReservasiBatal?.count}
            subtitle="Reservasi Batal"
            icon={
              <CancelPresentationIcon
                sx={{ color: "#fc0341", fontSize: "50px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahReservasiGagal?.count}
            subtitle="Pelanggan Tidak Hadir"
            icon={<NoAccountsIcon sx={{ color: "black", fontSize: "50px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahReservasiBerhasil?.count}
            subtitle="Reservasi Disetujui"
            icon={<VerifiedIcon sx={{ color: "green", fontSize: "50px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahService?.count}
            subtitle="Total Layanan"
            icon={
              <ProductionQuantityLimitsIcon
                sx={{ color: "secondary.main", fontSize: "50px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="primary.main"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jumlahProduk?.count}
            subtitle="Total Produk"
            icon={
              <Inventory sx={{ color: "secondary.main", fontSize: "45px" }} />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
