import MovieCardContainer from "@/components/MovieCardContainer";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import { trendingMovies } from "@/constants";
import { useSearchMoviesQuery , useLazyGetMovieDetailsQuery} from "@/services/api";
import { useState, useMemo, useEffect } from "react";
import Footer from "@/components/Footer";


const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ genre: "", year: "", sortBy: "" });
  const [detailedMovies, setDetailedMovies] = useState<any[]>([]);
const [getMovieDetails] = useLazyGetMovieDetailsQuery();

  const { data, isLoading, error } = useSearchMoviesQuery(
    { query: searchQuery },
    { skip: !searchQuery }
  );


  const filteredMovies = useMemo(() => {
    if (!detailedMovies.length) return [];

    let movies = [...detailedMovies];

    if (filters.year) {
      movies = movies.filter((m) => m.Year === filters.year);
    }

    if (filters.genre) {
      movies = movies.filter((m) =>
        m.Genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    if (filters.sortBy === "Release Date") {
      movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }

    return movies;
  }, [detailedMovies, filters]);

  useEffect(() => {
    if (!data?.Search) return;

    Promise.all(data.Search.map((m) => getMovieDetails(m.Title).unwrap()))
      .then((movies) => setDetailedMovies(movies))
      .catch((err) => console.error(err));
  }, [data]);

  return (
    <div className="min-h-screen py-6 px-8 max-sm:px-2 bg-gray-50 overflow-y-auto scroll-bar">
     
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">B4U Movies</h1>
        <p className="text-gray-500">
          Discover trending and latest movies right here
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-4">
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

     
      <FilterBar onFilterChange={(f) => setFilters(f)} />
    
      <div className="max-w-xl mx-auto text-center mb-6">
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">No movie found</p>}
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-y-10 gap-x-12 mb-5">
        {searchQuery ? (
          filteredMovies.length > 0 ? (
            filteredMovies.map((m) => (
              <MovieCardContainer key={m.imdbID} title={m.Title} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No movies match your filters
            </p>
          )
        ) : (
          trendingMovies.map((title) => (
            <MovieCardContainer key={title} title={title} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
