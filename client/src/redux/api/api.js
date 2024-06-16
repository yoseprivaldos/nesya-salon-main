import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Category",
    "Services",
    "Reservations",
    "Auth",
    "Schedule",
    "Stats",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `api/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "api/products",
      providesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (newProduct) => ({
        url: "api/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `api/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: ({ productId, ...data }) => ({
        url: `api/products/${productId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getCategory: build.query({
      query: () => "api/category",
      providesTags: ["Category"],
    }),
    createService: build.mutation({
      query: (newService) => ({
        url: "api/services",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: ["Services"],
    }),
    getServices: build.query({
      query: () => "api/services",
      providesTags: ["Services"],
    }),
    getServiceById: build.query({
      query: (serviceId) => `api/services/${serviceId}`,
      providesTags: ["Services"],
    }),
    updateService: build.mutation({
      query: ({ serviceId, ...data }) => ({
        url: `api/services/${serviceId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: build.mutation({
      query: (serviceId) => ({
        url: `api/services/${serviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
    createReservation: build.mutation({
      query: (newReservation) => ({
        url: "api/reservations",
        method: "POST",
        body: newReservation,
      }),
      invalidatesTags: "Reservations",
    }),
    getReservations: build.query({
      query: () => "api/reservations",
      providesTags: ["Reservations"],
    }),
    getMyReservations: build.query({
      query: () => "api/reservations/my-reservation",
      providesTags: ["Reservations"],
    }),
    updateReservation: build.mutation({
      query: ({ reservationId, ...data }) => ({
        url: `api/reservations/${reservationId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Reservations"],
    }),
    createAdmin: build.mutation({
      query: (newAdmin) => ({
        url: "api/auth/create-admin",
        method: "POST",
        body: newAdmin,
      }),
      invalidatesTags: "Auth",
    }),
    getAllAdmin: build.query({
      query: () => "api/user/admins/show",
      providesTags: ["Users"],
    }),
    updateAdmin: build.mutation({
      query: ({ currentId, ...data }) => ({
        url: `api/user/admins/update/${currentId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteAdmin: build.mutation({
      query: (adminId) => ({
        url: `api/user/admins/delete/${adminId}`,
        method: "DELETE",
      }),
      providesTags: ["User"],
    }),

    //schedule
    getAllSchedule: build.query({
      query: () => "api/schedules/all",
      providesTags: ["Schedule"],
    }),
    deleteSchedule: build.mutation({
      query: (scheduleId) => ({
        url: `api/schedules/${scheduleId}`,
        method: "DELETE",
      }),
      providesTags: ["Schedule"],
    }),
    createSchedule: build.mutation({
      query: (newSchedule) => ({
        url: "api/schedules/create-schedule",
        method: "POST",
        body: newSchedule,
      }),
      invalidatesTags: ["Schedule"],
    }),
    updateSchedule: build.mutation({
      query: ({ scheduleId, ...data }) => ({
        url: `api/schedules/${scheduleId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Schedule"],
    }),
    deleteScheduleByReservation: build.mutation({
      query: ({ reservationId, ...data }) => ({
        url: `api/schedules/delete-schedule-reservation/${reservationId}`,
        method: "DELETE",
        body: data,
      }),
      providesTags: ["Schedule"],
    }),

    //stats
    getJumlahReservasi: build.query({
      query: () => "api/stats/reservations/all",
      providesTags: ["Reservations"],
    }),
    getJumlahReservasiBerhasil: build.query({
      query: () => "api/stats/reservations/confirmed",
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

export const {
  //User
  useGetUserQuery,
  //product
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetCategoryQuery,
  //services
  useCreateServiceMutation,
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  //reservation
  useCreateReservationMutation,
  useGetReservationsQuery,
  useUpdateReservationMutation,
  useGetMyReservationsQuery,
  //admin
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  //Schedule
  useGetAllScheduleQuery,
  useDeleteScheduleMutation,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleByReservationMutation,
  //stats
  useGetJumlahReservasiQuery,
  useGetJumlahReservasiBerhasilQuery,
  useGetJumlahReservasiBatalQuery,
  useGetJumlahReservasiMenungguQuery,
  useGetJumlahReservasiAbsentQuery,
  useGetJumlahReservasiSelesaiQuery,
  useGetJumlahPelangganQuery,
} = api;
