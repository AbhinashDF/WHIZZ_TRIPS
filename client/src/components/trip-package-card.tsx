import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Clock, MapPin, Users } from "lucide-react";
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
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={tripPackage.imageUrl}
          alt={tripPackage.title}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&h=300';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge className={getCategoryColor(tripPackage.category)}>
            {tripPackage.category.charAt(0).toUpperCase() + tripPackage.category.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
            {renderStars(tripPackage.rating)}
            <span className="ml-1 text-xs font-medium">{tripPackage.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{tripPackage.title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{tripPackage.description}</p>
        
        {/* Package Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{tripPackage.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{tripPackage.duration} days</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">${tripPackage.price}</span>
            <span className="text-gray-500 text-sm ml-1">per person</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {tripPackage.inclusions.slice(0, 2).map((inclusion, index) => (
            <div key={index} className="flex items-start text-xs text-gray-600">
              <Check className="text-secondary mr-2 mt-0.5 flex-shrink-0" size={12} />
              <span className="line-clamp-1">{inclusion}</span>
            </div>
          ))}
          {tripPackage.inclusions.length > 2 && (
            <div className="text-xs text-gray-500">+{tripPackage.inclusions.length - 2} more inclusions</div>
          )}
        </div>
        
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors"
          onClick={() => window.location.href = `/payment?package=${tripPackage.id}&travelers=1&type=package`}
        >
          Book Now - ${tripPackage.price}
        </Button>
      </CardContent>
    </Card>
  );
}
