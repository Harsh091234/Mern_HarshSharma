import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Star, Play } from "lucide-react";
import { useGetMovieDetailsQuery } from "@/services/api";
import { useParams } from "react-router-dom";
import { useGetActorImageQuery } from "@/services/googleApi";
import CastCard from "@/components/CastCard";

export interface Rating{
    Source: string;
    Value: string;
}

export default function MoviePage() {
  const { title } = useParams();
  if (!title) return;
  const { data, isLoading, error } = useGetMovieDetailsQuery(title);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="overflow-hidden rounded-2xl">
          <AspectRatio ratio={2 / 2.5}>
            <img
              src={data.Poster}
              alt="Inception"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{data.Title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{data.Released}</span>
            <span>•</span>
            <span>
              {data.Runtime && data.Runtime !== "N/A"
                ? `${Math.floor(parseInt(data.Runtime) / 60)}h ${parseInt(data.Runtime) % 60}m`
                : "N/A"}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1 text-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {Number(data.imdbRating | 0).toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.Genres?.split(",").map((genre: string) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">{data.Plot}</p>

          <div className="flex gap-3 pt-2">
            <Button className="gap-2 hover:cursor-pointer">
              <Play className="h-4 w-4" /> Watch Trailer
            </Button>
            <Button variant="outline" className="hover:cursor-pointer">
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {data.Actors?.split(",").map((actor: string) => (
            <CastCard key={actor} actor={actor.trim()} />
          ))}
        </div>
      </section>

      <Separator />

      {/* <section className="space-y-4">
        <h2 className="text-xl font-semibold">Trailers</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              className="overflow-hidden rounded-xl hover:shadow-md transition"
            >
              <AspectRatio ratio={16 / 9} className="max-h-[180px]">
                <img
                  src="https://picsum.photos/800/450"
                  alt="Trailer"
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </Card>
          ))}
        </div>
      </section> */}

      {/* <Separator /> */}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
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
              {data.Writer?.split(",").map((writer: string) => writer)}
            </p>
            <p>
              <span className="font-medium text-foreground">Box Office:</span>{" "}
              {data.BoxOffice}
            </p>
            <p>
              <span className="font-medium text-foreground">Language:</span>{" "}
              {data.Language?.split(",").map((language: string) => language)}
            </p>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Ratings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {data.Ratings?.map((rating: Rating, index: number) => (
              <div className="flex justify-between text-sm" key={index}>
                <p className="text-foreground font-medium">{rating.Source}</p>
                <p className="text-muted-foreground">{rating.Value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
