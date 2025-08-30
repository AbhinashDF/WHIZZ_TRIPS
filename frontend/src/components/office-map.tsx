import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface OfficeMapProps {
  address?: string;
}

export default function OfficeMap({ 
  address = "123 Travel Street, New York, NY 10001"
}: OfficeMapProps) {
  const [zoom, setZoom] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));

  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <Card className="w-full h-96 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-gray-200">
      <CardContent className="p-0 h-full relative">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-md"
            onClick={handleZoomIn}
          >
            <ZoomIn size={16} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-md"
            onClick={handleZoomOut}
          >
            <ZoomOut size={16} />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-md"
            onClick={openDirections}
          >
            <Navigation size={16} className="mr-1" />
            Directions
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-md"
            onClick={openInGoogleMaps}
          >
            <ExternalLink size={16} className="mr-1" />
            Open in Maps
          </Button>
        </div>

        {/* Simulated Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Crect fill='%23e6f3ff' width='1000' height='500'/%3E%3Cpath fill='%23c8e6c9' d='M0 300h200v200H0z'/%3E%3Cpath fill='%23ffeb9c' d='M200 250h300v250H200z'/%3E%3Cpath fill='%23ffd1dc' d='M500 200h250v300H500z'/%3E%3Cpath fill='%23e1f5fe' d='M750 150h250v350H750z'/%3E%3Cpath fill='%23f3e5f5' d='M0 0h300v300H0z'/%3E%3Cpath fill='%23e8f5e8' d='M300 0h400v250H300z'/%3E%3Cpath fill='%23fff3e0' d='M700 0h300v200H700z'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Street Network Overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#6b7280" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
            {/* Main Roads */}
            <line x1="0" y1="50" x2="100" y2="50" stroke="#4b5563" strokeWidth="1" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#4b5563" strokeWidth="1" />
            <line x1="25" y1="0" x2="25" y2="100" stroke="#6b7280" strokeWidth="0.5" />
            <line x1="75" y1="0" x2="75" y2="100" stroke="#6b7280" strokeWidth="0.5" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="#6b7280" strokeWidth="0.5" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#6b7280" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Office Location Marker */}
        <div
          className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{
            left: '55%',
            top: '45%',
            transform: `translate(-50%, -50%) scale(${zoom}) ${isHovered ? 'scale(1.2)' : ''}`,
          }}
          onClick={openInGoogleMaps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Marker */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
              <MapPin size={16} className="text-white" />
            </div>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary opacity-30 animate-ping" />
            
            {/* Office Info Tooltip */}
            {isHovered && (
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-64 z-30 border border-gray-200">
                <div className="text-sm font-semibold text-gray-900 mb-1">WHIZZ TRAVELS HQ</div>
                <div className="text-xs text-gray-600 mb-2">{address}</div>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs">Open Now</Badge>
                  <Badge variant="outline" className="text-xs">Travel Agency</Badge>
                </div>
                <div className="text-xs text-gray-500 mt-2">Click for directions</div>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
              </div>
            )}
          </div>
        </div>

        {/* Nearby Landmarks */}
        <div
          className="absolute z-5 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: '70%', top: '30%', transform: `translate(-50%, -50%) scale(${zoom})` }}
        >
          <div className="w-3 h-3 rounded-full bg-green-500 border border-white shadow-md" title="Central Park" />
        </div>
        
        <div
          className="absolute z-5 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: '40%', top: '60%', transform: `translate(-50%, -50%) scale(${zoom})` }}
        >
          <div className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-md" title="Subway Station" />
        </div>

        <div
          className="absolute z-5 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: '30%', top: '35%', transform: `translate(-50%, -50%) scale(${zoom})` }}
        >
          <div className="w-3 h-3 rounded-full bg-orange-500 border border-white shadow-md" title="Times Square" />
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs font-semibold text-gray-700 mb-2">WHIZZ TRAVELS Office</div>
          <div className="flex items-center text-xs text-gray-600">
            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
            <span>123 Travel Street, NYC</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Navigation size={10} className="mr-1" />
            <span>Click for directions</span>
          </div>
        </div>

        {/* Business Hours Badge */}
        <div className="absolute top-16 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
          Open Now • Mon-Fri 9AM-7PM
        </div>
      </CardContent>
    </Card>
  );
}
