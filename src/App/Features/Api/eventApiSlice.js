import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "../../service/config";

export const EventApiSlice = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: Config.baseUrl }),
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (newEvent) => ({
        url: Config.createEvent,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: newEvent,
      }),
    }),
  }),
});

export const { useGetEventsQuery, useGetEventByIdQuery, useAddEventMutation } =
  EventApiSlice;
