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
    <Card onClick={() => navigate(`/movie/${title}`)} className="w-full max-w-[18rem] max-h-[23rem] overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition hover:cursor-pointer">
   
      <AspectRatio ratio={16 / 10}>
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </AspectRatio>

      <CardHeader className="py-2 space-y-2">
        {/* Title */}
        <CardTitle className="text-lg font-semibold line-clamp-1">
          {title}
        </CardTitle>

    
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{releaseDate}</span>
          <div className="flex items-center gap-1 text-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{Number(rating | 0).toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
    
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge key={genre} variant={'outline'}>
              {genre}
            </Badge>
          ))}
        </div>


        <p className="text-sm text-muted-foreground line-clamp-3">{overview}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard
