import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type contactTypes = {
  id: string;
  name: string;
  age: string;
};

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
  tagTypes: ["GOGO"],
  endpoints: (builder) => ({
    //contactypes is return type and sec argument is post type
    //YOU CAN PUT ANY NAME OF YOUR PROVIDER NAMA
    //IN QUERY THIS WILL BE PROVIDERS-TAG AND MUTATION IT WILL BE INVALIDATES-TAGS
    getcontactApi: builder.query<contactTypes[], void>({
      query: () => `contacts`,
      providesTags: ["GOGO"],
    }),

    //same thing for react mutation also'
    // you can also send header in query function
    //   headers: {
    //     'content-type': 'text/plain',
    // },

    postcontactapi: builder.mutation<void, contactTypes>({
      query: (contactsdata: contactTypes) => ({
        url: "contacts",
        method: "POST",
        body: contactsdata,
      }),
      invalidatesTags: ["GOGO"],
    }),

    deletecontactapi: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GOGO"],
    }),

    updatecontactapi: builder.mutation<void, contactTypes>({
      query: ({ id, ...rest }) => ({
        url: `contacts/${id}`,
        method: "PATCH",
        body: {
          id,
          ...rest,
        },
      }),
      invalidatesTags: ["GOGO"],
    }),
  }),
});

export const {
  useGetcontactApiQuery,
  usePostcontactapiMutation,
  useDeletecontactapiMutation,
  useUpdatecontactapiMutation,
} = contactApi;
