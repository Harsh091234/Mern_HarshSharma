import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const googleApi = createApi({
  reducerPath: "googleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/customsearch/v1",
  }),
  endpoints: (builder) => ({
    getActorImage: builder.query<any, string>({
      query: (actorName) => ({
        url: "",
        params: {
          key: import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY,
          cx: import.meta.env.VITE_CSE_ID,
          searchType: "image",
          q: actorName,
          num: 1,
        },
        transformResponse: (response: any) =>
          response.items?.[0]?.image?.thumbnailLink ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(actorName)}`,
      }),
    }),

    getYouTubeTrailer: builder.query<{ videoId: string }, string>({
      query: (title) => {
        const query = encodeURIComponent(`${title} trailer`);
        return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY}`;
      },
      transformResponse: (response: any) => {
      
        return { videoId: response.items?.[0]?.id?.videoId };
      },
    }),
  }),
});

export const { useGetActorImageQuery, useGetYouTubeTrailerQuery } = googleApi;
