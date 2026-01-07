import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

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
    searchMovies: builder.query<SearchResult, { query: string }>({
      query: ({ query }) =>
        `?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}&type=movie`,
    }),

  }),
});
export const { useLazyGetMovieDetailsQuery, useGetMovieDetailsQuery, useSearchMoviesQuery }  = api;
