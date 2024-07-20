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
    "Rating",
    "Employee",
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
    getProductById: build.query({
      query: (productId) => `api/products/${productId}`,
      provideTags: ["Products"],
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
    //category
    getCategory: build.query({
      query: () => "api/category",
      providesTags: ["Category"],
    }),
    //service
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
    updateServiceViews: build.mutation({
      query: (serviceIds) => ({
        url: `api/services/updateNumberOfViews`,
        method: "POST",
        body: serviceIds,
      }),
      invalidatesTags: ["Service"],
    }),
    //reservation
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

    //ratings
    createRating: build.mutation({
      query: (newRating) => ({
        url: "api/ratings",
        method: "POST",
        body: newRating,
      }),
      invalidatesTags: ["Rating"],
    }),
    getRatingsByUser: build.query({
      query: (user_id) => `api/ratings/user/${user_id}`,
      providesTags: ["Rating"],
    }),
    getRatingsByReservation: build.query({
      query: (reservation_id) => `api/ratings/reservation/${reservation_id}`,
      providesTags: ["Rating"],
    }),
    getRatingsByService: build.query({
      query: (service_id) => `api/ratings/service/${service_id}`,
      providesTags: ["Rating"],
    }),
    getAverageRatingForService: build.query({
      query: (service_id) => `api/ratings/service/${service_id}/average`,
      providesTags: ["Rating"],
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
    getJumlahService: build.query({
      query: () => "api/stats/service/all",
      providesTags: ["Service"],
    }),
    getJumlahProduk: build.query({
      query: () => "api/stats/product/all",
      providesTags: ["Product"],
    }),
    //email
    createEmail: build.mutation({
      query: (emailData) => ({
        url: "/api/email/send",
        method: "POST",
        body: emailData,
      }),
    }),
    //report
    generateExcelReport: build.query({
      query: ({ startDate, endDate }) => ({
        url: `api/reports/excel?startDate=${startDate}&endDate=${endDate}`,
      }),
    }),
    // PDF Report
    generatePdfReport: build.query({
      query: ({ startDate, endDate }) => ({
        url: `api/reports/pdf?startDate=${startDate}&endDate=${endDate}`,
      }),
    }),
    // Employee
    createEmployee: build.mutation({
      query: (newEmployee) => ({
        url: "api/employees",
        method: "POST",
        body: newEmployee,
      }),
      invalidatesTags: ["Employee"],
    }),
    getAllEmployees: build.query({
      query: () => "api/employees",
      providesTags: ["Employee"],
    }),
    getEmployeeById: build.query({
      query: (employeeId) => `api/employees/${employeeId}`,
      providesTags: ["Employee"],
    }),
    updateEmployee: build.mutation({
      query: ({ employeeId, ...data }) => ({
        url: `api/employees/${employeeId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: build.mutation({
      query: (employeeId) => ({
        url: `api/employees/${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    addAvailability: build.mutation({
      query: ({ employeeId, ...availabilityData }) => ({
        url: `api/employees/${employeeId}/availability`,
        method: "PATCH",
        body: availabilityData,
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  //User
  useGetUserQuery,
  //product
  useGetProductsQuery,
  useGetProductByIdQuery,
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
  useUpdateServiceViewsMutation,
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
  useGetJumlahServiceQuery,
  useGetJumlahProdukQuery,
  //rating
  useCreateRatingMutation,
  //email
  useCreateEmailMutation,
  // Excel and PDF report hooks
  useGenerateExcelReportQuery,
  useGeneratePdfReportQuery,
  //employee
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useAddAvailabilityMutation,
} = api;
