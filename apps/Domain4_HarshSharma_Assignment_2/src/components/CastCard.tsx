// CastCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { useGetActorImageQuery } from "@/services/googleApi";


interface CastCardProps {
  actor: string;
}

const CastCard = ({ actor }: CastCardProps) => {
  const { data: imageUrl, isLoading } = useGetActorImageQuery(actor.trim());

  return (
    <Card className="text-center">
      <CardContent className="p-3 space-y-2">
        <img
          src={
            isLoading ? "https://ui-avatars.com/api/?name=Loading" : imageUrl.items[0].image.thumbnailLink 
          }
          alt={actor}
          className="mx-auto h-24 w-24 rounded-full object-cover"
        />
        <p className="text-sm font-medium">{actor}</p>
      </CardContent>
    </Card>
  );``
};

export default CastCard;
