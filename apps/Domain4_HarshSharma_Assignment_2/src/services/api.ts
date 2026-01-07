    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.omdbapi.com/" }),
    endpoints: (builder) => ({
        getMovieDetails: builder.query<any, string>({
        query: (title) => ({
            url: "",
            params: {
            t: title,
            apikey: import.meta.env.VITE_OMDB_API_KEY,
            
            },
        }),
        
        }),
    }),
    });
    export const { useLazyGetMovieDetailsQuery, useGetMovieDetailsQuery}  = api;

