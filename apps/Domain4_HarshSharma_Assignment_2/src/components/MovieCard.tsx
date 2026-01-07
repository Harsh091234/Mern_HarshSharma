import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  title: string;
  posterUrl: string;
  releaseDate: string;
  rating: number; // 0–10
  genres: string[];
  overview: string;

}

const MovieCard = ({
  title,
  posterUrl,
  releaseDate,
  rating,
  genres,
  overview,

}: MovieCardProps) => {

    const navigate = useNavigate();
 
  return (
    <Card
      onClick={() => navigate(`/movie/${title}`)}
      className="
        w-[18rem]
        max-sm:w-full
        rounded-2xl border bg-background
        shadow-sm cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg
      "
    >
   
      <div className="relative h-65 max-sm:h-80 overflow-hidden rounded-t-2xl">
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-top "
        />
      </div>

      {/* Header */}
      <CardHeader className="px-4 py-3 space-y-1.5">
        <CardTitle className="text-sm sm:text-base font-semibold line-clamp-1">
          {title}
        </CardTitle>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{releaseDate}</span>

          <div className="flex items-center gap-1 text-foreground">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {Number(rating || 0).toFixed(1)}
            </span>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 pb-4 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {genres.slice(0, 3).map((genre) => (
            <Badge
              key={genre}
              variant="outline"
              className="text-[10px] sm:text-[11px]"
            >
              {genre}
            </Badge>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {overview}
        </p>
      </CardContent>
    </Card>
  );
};

export default MovieCard
