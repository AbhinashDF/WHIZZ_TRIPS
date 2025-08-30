import TripPackageCard from "@/components/trip-package-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Destination, Flight, Hotel, TripPackage } from "@/shared/schema";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Camera, Car, Coffee, MapPin, Star, Wifi } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function DestinationDetails() {
  const [location] = useLocation();
  const destinationId = location.split('/')[2];

  const { data: destination, isLoading: destinationLoading } = useQuery<Destination>({
    queryKey: ["/api/destinations", destinationId],
    queryFn: async () => {
      const response = await fetch(`/api/destinations/${destinationId}`);
      return response.json();
    },
  });

  const { data: relatedPackages } = useQuery<TripPackage[]>({
    queryKey: ["/api/trip-packages", destination?.location],
    queryFn: async () => {
      const response = await fetch("/api/trip-packages");
      const packages = await response.json();
      return packages.filter((pkg: TripPackage) => 
        pkg.location.toLowerCase().includes(destination?.location.toLowerCase() || '')
      );
    },
    enabled: !!destination,
  });

  const { data: hotels } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels", destination?.location],
    queryFn: async () => {
      const response = await fetch(`/api/hotels?location=${destination?.location}`);
      return response.json();
    },
    enabled: !!destination,
  });

  const { data: flights } = useQuery<Flight[]>({
    queryKey: ["/api/flights", destination?.location],
    queryFn: async () => {
      const response = await fetch("/api/flights");
      const allFlights = await response.json();
      return allFlights.filter((flight: Flight) => 
        flight.to.toLowerCase().includes(destination?.location.toLowerCase() || '') ||
        flight.to.toLowerCase().includes(destination?.name.toLowerCase() || '')
      );
    },
    enabled: !!destination,
  });

  const attractions = [
    { name: "Historic City Center", description: "Explore centuries-old architecture and museums", icon: Camera },
    { name: "Local Markets", description: "Experience authentic local culture and cuisine", icon: Coffee },
    { name: "Natural Landscapes", description: "Breathtaking views and outdoor activities", icon: MapPin },
  ];

  const amenities = [
    { name: "Free WiFi", icon: Wifi },
    { name: "Airport Transfer", icon: Car },
    { name: "Tour Guide", icon: MapPin },
    { name: "Photography", icon: Camera },
  ];

  if (destinationLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80">
            <ArrowLeft size={20} className="mr-2" />
            Back to Destinations
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span className="text-lg">{destination.location}</span>
              </div>
              <div className="flex items-center">
                <Star size={20} className="mr-1 fill-current text-yellow-400" />
                <span className="text-lg">{destination.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {destination.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Top Attractions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {attractions.map((attraction, index) => {
                    const IconComponent = attraction.icon;
                    return (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <IconComponent className="text-primary mb-2" size={24} />
                        <h4 className="font-semibold mb-1">{attraction.name}</h4>
                        <p className="text-sm text-gray-600">{attraction.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Packages, Hotels, Flights Tabs */}
            <Tabs defaultValue="packages" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="packages">Trip Packages ({relatedPackages?.length || 0})</TabsTrigger>
                <TabsTrigger value="hotels">Hotels ({hotels?.length || 0})</TabsTrigger>
                <TabsTrigger value="flights">Flights ({flights?.length || 0})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="packages" className="mt-6">
                {relatedPackages && relatedPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPackages.map((pkg) => (
                      <TripPackageCard
                        key={pkg.id}
                        tripPackage={pkg}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No packages available for this destination yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="hotels" className="mt-6">
                {hotels && hotels.length > 0 ? (
                  <div className="space-y-4">
                    {hotels.map((hotel) => (
                      <Card key={hotel.id} className="overflow-hidden">
                        <div className="flex">
                          <img
                            src={hotel.imageUrl}
                            alt={hotel.name}
                            className="w-48 h-32 object-cover"
                          />
                          <CardContent className="flex-1 p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
                                <div className="flex items-center mb-2">
                                  <div className="flex text-yellow-400 mr-2">
                                    {[...Array(hotel.starRating)].map((_, i) => (
                                      <Star key={i} size={16} className="fill-current" />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-600">({hotel.rating})</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
                                <p className="text-xs text-gray-500">{hotel.distanceFromCenter}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">${hotel.pricePerNight}</div>
                                <div className="text-sm text-gray-600">per night</div>
                                <Button className="mt-2" size="sm">Book Hotel</Button>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No hotels found for this destination.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="flights" className="mt-6">
                {flights && flights.length > 0 ? (
                  <div className="space-y-4">
                    {flights.map((flight) => (
                      <Card key={flight.id} className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-8">
                            <div className="text-center">
                              <div className="text-lg font-bold">{flight.departureTime}</div>
                              <div className="text-sm text-gray-600">{flight.from}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-px bg-gray-300"></div>
                              <div className="text-sm text-gray-600">{flight.duration}</div>
                              <div className="w-8 h-px bg-gray-300"></div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{flight.arrivalTime}</div>
                              <div className="text-sm text-gray-600">{flight.to}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${flight.price}</div>
                            <Button size="sm">Book Flight</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No flights found for this destination.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">From ${destination.price}</div>
                  <div className="text-gray-600">per person</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold">Included Services</h3>
                  {amenities.map((amenity, index) => {
                    const IconComponent = amenity.icon;
                    return (
                      <div key={index} className="flex items-center">
                        <IconComponent size={16} className="text-primary mr-3" />
                        <span className="text-sm">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
                  onClick={() => window.location.href = '/booking'}
                >
                  Book This Destination
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
