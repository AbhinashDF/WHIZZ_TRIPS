import { useState, useEffect } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@shared/schema";

interface InteractiveMapProps {
  destinations: Destination[];
  onDestinationClick?: (destination: Destination) => void;
  selectedDestination?: Destination | null;
}

interface MapDestination {
  id: string;
  name: string;
  location: string;
  price: string;
  x: number; // Percentage position
  y: number; // Percentage position
  color: string;
}

export default function InteractiveMap({ 
  destinations, 
  onDestinationClick, 
  selectedDestination 
}: InteractiveMapProps) {
  const [zoom, setZoom] = useState(1);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);

  // Map destinations to coordinates (simulated world map positions)
  const mapDestinations: MapDestination[] = destinations.map((dest) => {
    let coordinates = { x: 50, y: 50 }; // Default center
    let color = "bg-primary";

    // Simulate real-world coordinates (very simplified)
    if (dest.location.toLowerCase().includes('maldives')) {
      coordinates = { x: 75, y: 65 };
      color = "bg-blue-500";
    } else if (dest.location.toLowerCase().includes('japan') || dest.location.toLowerCase().includes('tokyo')) {
      coordinates = { x: 85, y: 35 };
      color = "bg-red-500";
    } else if (dest.location.toLowerCase().includes('france') || dest.location.toLowerCase().includes('paris')) {
      coordinates = { x: 50, y: 30 };
      color = "bg-blue-600";
    } else if (dest.location.toLowerCase().includes('kenya') || dest.location.toLowerCase().includes('africa')) {
      coordinates = { x: 55, y: 70 };
      color = "bg-green-600";
    } else if (dest.location.toLowerCase().includes('nepal')) {
      coordinates = { x: 75, y: 40 };
      color = "bg-orange-500";
    } else if (dest.location.toLowerCase().includes('india')) {
      coordinates = { x: 73, y: 45 };
      color = "bg-orange-600";
    } else if (dest.location.toLowerCase().includes('peru')) {
      coordinates = { x: 25, y: 75 };
      color = "bg-yellow-600";
    } else if (dest.location.toLowerCase().includes('greece')) {
      coordinates = { x: 55, y: 35 };
      color = "bg-blue-400";
    } else if (dest.location.toLowerCase().includes('morocco')) {
      coordinates = { x: 45, y: 40 };
      color = "bg-amber-600";
    } else if (dest.location.toLowerCase().includes('caribbean')) {
      coordinates = { x: 30, y: 50 };
      color = "bg-cyan-500";
    }

    return {
      id: dest.id,
      name: dest.name,
      location: dest.location,
      price: dest.price,
      x: coordinates.x,
      y: coordinates.y,
      color
    };
  });

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));

  return (
    <Card className="w-full h-96 relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
      <CardContent className="p-0 h-full relative">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleZoomIn}
          >
            <ZoomIn size={16} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleZoomOut}
          >
            <ZoomOut size={16} />
          </Button>
        </div>

        {/* World Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Crect fill='%23e6f3ff' width='1000' height='500'/%3E%3Cpath fill='%23b8e6b8' d='M100 100h150v80h-150z'/%3E%3Cpath fill='%23ffeb9c' d='M300 120h200v100h-200z'/%3E%3Cpath fill='%23ffd1dc' d='M600 80h120v90h-120z'/%3E%3Cpath fill='%23e6ffe6' d='M150 300h180v120h-180z'/%3E%3Cpath fill='%23ffe4b5' d='M400 280h160v100h-160z'/%3E%3Cpath fill='%23f0e68c' d='M700 250h100v80h-100z'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Destination Markers */}
        {mapDestinations.map((dest) => (
          <div
            key={dest.id}
            className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125"
            style={{
              left: `${dest.x}%`,
              top: `${dest.y}%`,
              transform: `translate(-50%, -50%) scale(${zoom})`,
            }}
            onClick={() => {
              const originalDest = destinations.find(d => d.id === dest.id);
              if (originalDest && onDestinationClick) {
                onDestinationClick(originalDest);
              }
            }}
            onMouseEnter={() => setHoveredDestination(dest.id)}
            onMouseLeave={() => setHoveredDestination(null)}
          >
            {/* Marker */}
            <div className="relative">
              <div className={`w-6 h-6 rounded-full ${dest.color} border-2 border-white shadow-lg flex items-center justify-center animate-pulse`}>
                <MapPin size={12} className="text-white" />
              </div>
              
              {/* Ripple Effect */}
              <div className={`absolute inset-0 w-6 h-6 rounded-full ${dest.color} opacity-30 animate-ping`} />
              
              {/* Tooltip */}
              {(hoveredDestination === dest.id || selectedDestination?.id === dest.id) && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 z-20">
                  <div className="text-sm font-semibold text-gray-900">{dest.name}</div>
                  <div className="text-xs text-gray-600">{dest.location}</div>
                  <div className="text-sm font-bold text-primary mt-1">From ${dest.price}</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Popular Destinations</div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1" />
              Beach
            </Badge>
            <Badge variant="outline" className="text-xs">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-1" />
              Safari
            </Badge>
            <Badge variant="outline" className="text-xs">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-1" />
              Adventure
            </Badge>
            <Badge variant="outline" className="text-xs">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-1" />
              Cultural
            </Badge>
          </div>
        </div>

        {/* Navigation Info */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center text-xs text-gray-600">
            <Navigation size={12} className="mr-1" />
            Click markers to explore destinations
          </div>
        </div>
      </CardContent>
    </Card>
  );
}