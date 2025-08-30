import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Destination } from "@/shared/schema";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform cursor-pointer">
      <img
        src={destination.imageUrl}
        alt={destination.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-lg">From ${destination.price}</span>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 font-medium"
            onClick={() => window.location.href = `/destination/${destination.id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
