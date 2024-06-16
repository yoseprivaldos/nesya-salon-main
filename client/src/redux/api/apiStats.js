import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiStats = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "api",
  tagTypes: ["Reservations", "User"],
  endpoints: (build) => ({
    getJumlahReservasi: build.query({
      query: () => "api/stats/reservations/all",
      providesTags: ["Reservations"],
    }),
    getJumlahReservasiBerhasil: build.query({
      query: () => "api/stats/reservations/",
      providesTags: ["Reservations"],
    }),
    getJumlahReservasiBatal: build.query({
      query: () => "api/stats/reservations/canceled",
      providesTags: ["Reservations"],
    }),
    getJumlahReservasiMenunggu: build.query({
      query: () => "api/stats/reservations/pending",
      providesTags: ["Reservations"],
    }),
    getJumlahReservasiAbsent: build.query({
      query: () => "api/stats/reservations/absent",
      providesTags: ["Reservations"],
    }),
    getJumlahReservasiSelesai: build.query({
      query: () => "api/stats/reservations/completed",
      providesTags: ["Reservations"],
    }),
    getJumlahPelanggan: build.query({
      query: () => "api/stats/user/all",
      providesTags: ["User"],
    }),
  }),
});
// Export reducer, actions, dan hooks yang dihasilkan
export const {
  useGetJumlahReservasiQuery,
  useGetJumlahReservasiBerhasilQuery,
  useGetJumlahReservasiBatalQuery,
  useGetJumlahReservasiMenungguQuery,
  useGetJumlahReservasiAbsentQuery,
  useGetJumlahReservasiSelesaiQuery,
  useGetJumlahPelangganQuery,
} = apiStats;

export default apiStats;
