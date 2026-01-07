import { useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Star, Play } from "lucide-react";

import { useGetMovieDetailsQuery } from "@/services/api";
import { useGetYouTubeTrailerQuery } from "@/services/googleApi";

import CastCard from "@/components/CastCard";
import TrailerSkeleton from "@/components/skeletons/TrailerSkeleton";

export interface Rating {
  Source: string;
  Value: string;
}

export default function MoviePage() {
  const { title } = useParams<{ title: string }>();
  const [showTrailer, setShowTrailer] = useState(false);

  if (!title) return null;

  const { data, isLoading } = useGetMovieDetailsQuery(title);
  const { data: trailerData, isLoading: trailerLoading } =
    useGetYouTubeTrailerQuery(title, {
      skip: !showTrailer,
    });

  if (isLoading || !data) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
    
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  
        <Card
          className="
            overflow-hidden rounded-2xl
            w-full max-w-[280px] sm:max-w-[320px]
            mx-auto lg:mx-0
            h-[420px] sm:h-[460px]
            lg:col-span-4
          "
        >
          <img
            src={data.Poster}
            alt={data.Title}
            className="h-full w-full object-cover"
          />
        </Card>

  
        <div className="lg:col-span-8 space-y-5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {data.Title}
          </h1>


          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>{data.Released}</span>
            <span>•</span>
            <span>
              {data.Runtime && data.Runtime !== "N/A"
                ? `${Math.floor(parseInt(data.Runtime) / 60)}h ${
                    parseInt(data.Runtime) % 60
                  }m`
                : "N/A"}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1 text-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {Number(data.imdbRating || 0).toFixed(1)}
              </span>
            </div>
          </div>


          <div className="flex flex-wrap gap-2">
            {data.Genre?.split(",").map((genre: string) => (
              <Badge
                key={genre}
                variant="secondary"
                className="px-3 py-1 text-xs rounded-full"
              >
                {genre.trim()}
              </Badge>
            ))}
          </div>

  
          <p className="text-muted-foreground leading-relaxed">{data.Plot}</p>

 
          <div className="pt-4">
            <Button
              size="lg"
              className="gap-2 w-full sm:w-auto"
              onClick={() => setShowTrailer(true)}
            >
              <Play className="h-4 w-4" /> Watch Trailer
            </Button>
          </div>

       
          {showTrailer && (
            <div className="mt-6">
              {trailerLoading && (
                <TrailerSkeleton />
              )}

              {trailerData?.videoId && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerData.videoId}`}
                    title={`${data.Title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {!trailerLoading && !trailerData?.videoId && (
                <p className="text-sm text-muted-foreground">
                  Trailer not available
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <Separator />

  
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.Actors?.split(",").map((actor: string) => (
            <CastCard key={actor} actor={actor.trim()} />
          ))}
        </div>
      </section>

      <Separator />

      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle>Movie Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Director:</span>{" "}
              {data.Director}
            </p>
            <p>
              <span className="font-medium text-foreground">Writers:</span>{" "}
              {data.Writer}
            </p>
            <p>
              <span className="font-medium text-foreground">Box Office:</span>{" "}
              {data.BoxOffice}
            </p>
            <p>
              <span className="font-medium text-foreground">Language:</span>{" "}
              {data.Language}
            </p>
          </CardContent>
        </Card>

      
        <Card className="lg:col-span-5 h-fit">
          <CardHeader>
            <CardTitle>Ratings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {data.Ratings?.map((rating: Rating, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium text-foreground">
                  {rating.Source}
                </span>
                <span>{rating.Value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
