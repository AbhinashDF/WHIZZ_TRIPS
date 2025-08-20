import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plane, Bed, Briefcase, Star, Crown, Mountain, Users, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBookingSchema } from "@shared/schema";
import { cn } from "@/lib/utils";
import type { InsertBooking, Flight, Hotel } from "@shared/schema";

export default function Booking() {
  const [activeTab, setActiveTab] = useState("flights");
  const [flightSearchResults, setFlightSearchResults] = useState<Flight[]>([]);
  const [hotelSearchResults, setHotelSearchResults] = useState<Hotel[]>([]);
  const [showFlightResults, setShowFlightResults] = useState(false);
  const [showHotelResults, setShowHotelResults] = useState(false);
  const { toast } = useToast();

  // Get package ID from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get('package');

  const { data: flights } = useQuery<Flight[]>({
    queryKey: ["/api/flights"],
  });

  const { data: hotels } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const bookingForm = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema.extend({
      departureDate: insertBookingSchema.shape.departureDate,
      returnDate: insertBookingSchema.shape.returnDate.optional(),
    })),
    defaultValues: {
      packageId: packageId || "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      travelers: 1,
      departureDate: new Date(),
      returnDate: undefined,
      totalPrice: "0",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Booking confirmed!",
        description: `Your booking has been confirmed. Booking ID: ${data.id}`,
      });
      bookingForm.reset();
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onBookingSubmit = (data: InsertBooking) => {
    bookingMutation.mutate(data);
  };

  const handleFlightSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFlightSearchResults(flights || []);
    setShowFlightResults(true);
  };

  const handleHotelSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHotelSearchResults(hotels || []);
    setShowHotelResults(true);
  };

  const bookingTabs = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "hotels", label: "Hotels", icon: Bed },
    { id: "packages", label: "Packages", icon: Briefcase },
  ];

  const packageTypes = [
    {
      id: "luxury",
      title: "Luxury Packages",
      description: "Premium accommodations, first-class flights, and exclusive experiences.",
      price: "Starting from $4,999",
      icon: Crown,
      color: "text-accent",
    },
    {
      id: "adventure",
      title: "Adventure Packages",
      description: "Thrilling activities, unique accommodations, and guided adventures.",
      price: "Starting from $2,299",
      icon: Mountain,
      color: "text-red-500",
    },
    {
      id: "family",
      title: "Family Packages",
      description: "Family-friendly destinations with activities for all ages.",
      price: "Starting from $1,899",
      icon: Users,
      color: "text-secondary",
    },
    {
      id: "cultural",
      title: "Cultural Packages",
      description: "Immersive cultural experiences and historical discoveries.",
      price: "Starting from $1,599",
      icon: Landmark,
      color: "text-purple-500",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Book Your Journey</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find and book flights, hotels, and complete travel packages all in one place.
          </p>
        </div>
      </section>

      {/* Booking Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {bookingTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium",
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent size={20} />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flight Booking Section */}
      {activeTab === "flights" && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white rounded-xl shadow-lg p-8">
              <CardContent className="pt-0">
                <h2 className="text-2xl font-bold mb-6">Search Flights</h2>
                <form onSubmit={handleFlightSearch} className="space-y-6">
                  <div className="flex space-x-4 mb-6">
                    <label className="flex items-center">
                      <input type="radio" name="tripType" value="round-trip" defaultChecked className="mr-2" />
                      <span>Round Trip</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="tripType" value="one-way" className="mr-2" />
                      <span>One Way</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="from">From</Label>
                      <Input id="from" placeholder="Departure city or airport" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="to">To</Label>
                      <Input id="to" placeholder="Destination city or airport" className="mt-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="departure">Departure Date</Label>
                      <Input id="departure" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="return">Return Date</Label>
                      <Input id="return" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="passengers">Passengers</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="1 Adult" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4+ Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg text-lg">
                    Search Flights
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Flight Results */}
            {showFlightResults && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6">Available Flights</h3>
                <div className="space-y-4">
                  {flightSearchResults.map((flight) => (
                    <Card key={flight.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.departureTime}</div>
                            <div className="text-sm text-gray-600">{flight.from}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-px bg-gray-300"></div>
                            <Plane className="text-primary" size={20} />
                            <div className="w-8 h-px bg-gray-300"></div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.arrivalTime}</div>
                            <div className="text-sm text-gray-600">{flight.to}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">{flight.duration}</div>
                            <div className="text-sm text-gray-600">{flight.stops} stop{flight.stops !== 1 ? 's' : ''}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${flight.price}</div>
                          <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg">
                            Select
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Hotel Booking Section */}
      {activeTab === "hotels" && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white rounded-xl shadow-lg p-8">
              <CardContent className="pt-0">
                <h2 className="text-2xl font-bold mb-6">Search Hotels</h2>
                <form onSubmit={handleHotelSearch} className="space-y-6">
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input id="destination" placeholder="Enter city or hotel name" className="mt-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="checkin">Check-in Date</Label>
                      <Input id="checkin" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="checkout">Check-out Date</Label>
                      <Input id="checkout" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="guests">Guests</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="1 Guest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg text-lg">
                    Search Hotels
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Hotel Results */}
            {showHotelResults && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6">Available Hotels</h3>
                <div className="grid grid-cols-1 gap-6">
                  {hotelSearchResults.map((hotel) => (
                    <Card key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="flex">
                        <img
                          src={hotel.imageUrl}
                          alt={hotel.name}
                          className="w-1/3 h-48 object-cover"
                        />
                        <div className="w-2/3 p-6 flex justify-between">
                          <div>
                            <h4 className="text-xl font-bold mb-2">{hotel.name}</h4>
                            <div className="flex items-center mb-2">
                              <div className="flex text-yellow-400 mr-2">
                                {[...Array(hotel.starRating)].map((_, i) => (
                                  <Star key={i} size={16} className="fill-current" />
                                ))}
                              </div>
                              <span className="text-gray-600">{hotel.starRating}-star luxury</span>
                            </div>
                            <p className="text-gray-600 mb-2">{hotel.amenities.join(" • ")}</p>
                            <p className="text-sm text-gray-500">{hotel.distanceFromCenter}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${hotel.pricePerNight}</div>
                            <div className="text-sm text-gray-600">per night</div>
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg mt-2">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Package Booking Section */}
      {activeTab === "packages" && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white rounded-xl shadow-lg p-8">
              <CardContent className="pt-0">
                <h2 className="text-2xl font-bold mb-6">Book Complete Packages</h2>
                
                <div className="text-center mb-8">
                  <p className="text-lg text-gray-600">
                    Select from our curated travel packages that include flights, hotels, and activities.
                  </p>
                </div>

                {/* Quick Package Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packageTypes.map((pkg) => {
                    const IconComponent = pkg.icon;
                    return (
                      <Card
                        key={pkg.id}
                        className="border border-gray-200 rounded-lg p-6 hover:border-primary cursor-pointer transition-colors"
                        onClick={() => {
                          window.location.href = "/trips";
                        }}
                      >
                        <CardContent className="pt-0">
                          <div className="flex items-center mb-4">
                            <IconComponent className={`${pkg.color} text-2xl mr-3`} size={32} />
                            <h3 className="text-xl font-bold">{pkg.title}</h3>
                          </div>
                          <p className="text-gray-600">{pkg.description}</p>
                          <div className="mt-4 text-primary font-bold">{pkg.price}</div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    onClick={() => window.location.href = "/trips"}
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg"
                  >
                    View All Packages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
