import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "../service/config";

export const apiSlice = createApi({
  reducerPath: "event",
  baseQuery: fetchBaseQuery({ baseUrl: Config.baseUrl }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => Config.getEvent,
    }),
    addEvent: builder.mutation({
      query: (newEvent) => ({
        url: Config.createEvent,
        method: "POST",
        headers: {
          "Content-Type"  : "application/json",
          "authorization" : `Bearer ${Config.token}`,
        },
        body: newEvent,
      }),
    }),
  }),
});

export const { useGetEventsQuery, useAddEventMutation } = apiSlice;
