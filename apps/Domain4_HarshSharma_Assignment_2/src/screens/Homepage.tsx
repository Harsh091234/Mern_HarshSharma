import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { useGetMovieDetailsQuery, useLazyGetMovieDetailsQuery } from "@/services/api";

const Homepage = () => {
  const { data, isLoading, error, refetch } = useGetMovieDetailsQuery("commando");

  if(isLoading) return <>loading...</>
  if(error) return <>error</>
  console.log("data:", data);
  

  return (
    <div className="flex min-h-svh p-3">
      <MovieCard
        title={data.Title}
        posterUrl={data.Poster}
        releaseDate={data.Released}
        rating={data.imdbRating}
        genres={data.Genre.split(",")}
        overview={data.Plot}
      
      />
    </div>
  );
};

export default Homepage;
