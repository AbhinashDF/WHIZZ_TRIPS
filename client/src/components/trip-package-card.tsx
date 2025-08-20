import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import type { TripPackage } from "@shared/schema";

interface TripPackageCardProps {
  tripPackage: TripPackage;
  onBook?: (id: string) => void;
}

export default function TripPackageCard({ tripPackage, onBook }: TripPackageCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "luxury":
        return "bg-accent text-accent-foreground";
      case "adventure":
        return "bg-red-500 text-white";
      case "family":
        return "bg-secondary text-secondary-foreground";
      case "cultural":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const renderStars = (rating: string) => {
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < fullStars || (i === fullStars && hasHalfStar) ? "fill-current" : ""}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
      <img
        src={tripPackage.imageUrl}
        alt={tripPackage.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge className={getCategoryColor(tripPackage.category)}>
            {tripPackage.category.charAt(0).toUpperCase() + tripPackage.category.slice(1)}
          </Badge>
          {renderStars(tripPackage.rating)}
        </div>
        <h3 className="text-xl font-bold mb-2">{tripPackage.title}</h3>
        <p className="text-gray-600 mb-4">{tripPackage.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">${tripPackage.price}</span>
          <span className="text-gray-500">per person</span>
        </div>
        <div className="space-y-2 mb-4">
          {tripPackage.inclusions.slice(0, 3).map((inclusion, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Check className="text-secondary mr-2" size={16} />
              {inclusion}
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors"
          onClick={() => onBook?.(tripPackage.id)}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
