import DestinationCard from "@/components/destination-card";
import HeroSection from "@/components/hero-section";
import InteractiveMap from "@/components/interactive-map";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Destination } from "@/shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Bed, Globe, Map, Plane, Star } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const featuredDestinations = destinations?.slice(0, 4) || [];

  const services = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Find the best deals on flights worldwide with our exclusive partnerships",
    },
    {
      icon: Bed,
      title: "Hotel Reservations",
      description: "Book luxury accommodations at competitive prices in prime locations",
    },
    {
      icon: Map,
      title: "Tour Packages",
      description: "Expertly curated travel packages for unforgettable experiences",
    },
  ];

  const testimonials = [
    {
      name: "John & Sarah",
      trip: "Maldives Trip",
      review: "WHIZZ TRAVELS made our honeymoon absolutely perfect. Every detail was taken care of!",
      initials: "JS",
    },
    {
      name: "Maria Johnson",
      trip: "European Tour",
      review: "Best travel agency ever! Professional service and amazing destinations. Highly recommended!",
      initials: "MJ",
    },
    {
      name: "David Kim",
      trip: "Kenya Safari",
      review: "The safari experience was life-changing. Thank you for making our dream trip come true!",
      initials: "DK",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Discover the World"
        subtitle="Your next adventure awaits. Explore breathtaking destinations with our expertly crafted travel experiences."
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
      />

      {/* Featured Destinations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Destinations</h2>
            <p className="text-xl text-gray-600">Discover our most popular travel destinations worldwide</p>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Bed size={16} />
                Grid View
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Globe size={16} />
                Map View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredDestinations.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map">
              {destinations && (
                <InteractiveMap
                  destinations={destinations}
                  selectedDestination={selectedDestination}
                  onDestinationClick={(dest) => {
                    setSelectedDestination(dest);
                    window.location.href = `/destination/${dest.id}`;
                  }}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Everything you need for the perfect trip</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center p-8 bg-white rounded-xl shadow-lg">
                  <CardContent className="pt-6">
                    <IconComponent className="text-primary text-4xl mb-4 mx-auto" size={48} />
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real travelers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 p-8 rounded-xl">
                <CardContent className="pt-0">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-accent fill-current" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-gray-600">{testimonial.trip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
