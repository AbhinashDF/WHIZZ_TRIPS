import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search, Filter, SortAsc, MapPin, DollarSign } from "lucide-react";
import TripPackageCard from "@/components/trip-package-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TripPackage } from "@shared/schema";

export default function Trips() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: allTripPackages, isLoading } = useQuery<TripPackage[]>({
    queryKey: ["/api/trip-packages"],
    queryFn: async () => {
      const response = await fetch("/api/trip-packages");
      return response.json();
    },
  });

  const filteredAndSortedPackages = useMemo(() => {
    if (!allTripPackages) return [];
    
    let filtered = allTripPackages.filter((pkg) => {
      // Category filter
      const categoryMatch = activeFilter === "all" || pkg.category === activeFilter;
      
      // Search filter
      const searchMatch = searchTerm === "" || 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price filter
      const price = parseFloat(pkg.price);
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      
      return categoryMatch && searchMatch && priceMatch;
    });
    
    // Sort packages
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "rating-desc":
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case "duration-asc":
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case "duration-desc":
        filtered.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }
    
    return filtered;
  }, [allTripPackages, activeFilter, searchTerm, sortBy, priceRange]);

  const filters = [
    { id: "all", label: "All Packages", count: allTripPackages?.length || 0 },
    { id: "luxury", label: "Luxury", count: allTripPackages?.filter(p => p.category === "luxury").length || 0 },
    { id: "adventure", label: "Adventure", count: allTripPackages?.filter(p => p.category === "adventure").length || 0 },
    { id: "family", label: "Family", count: allTripPackages?.filter(p => p.category === "family").length || 0 },
    { id: "cultural", label: "Cultural", count: allTripPackages?.filter(p => p.category === "cultural").length || 0 },
  ];

  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Highest Rated" },
    { value: "duration-asc", label: "Shortest Duration" },
    { value: "duration-desc", label: "Longest Duration" },
  ];

  const maxPrice = allTripPackages ? Math.max(...allTripPackages.map(p => parseFloat(p.price))) : 10000;

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleBookTrip = (packageId: string) => {
    // Navigate to booking page with selected package
    window.location.href = `/booking?package=${packageId}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Trip Plans & Packages</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our carefully curated travel packages designed to give you the ultimate experience in each destination.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search destinations, activities, or locations..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-colors text-sm",
                  activeFilter === filter.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                onClick={() => handleFilterChange(filter.id)}
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
          
          {/* Advanced Filters and Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                Filters
              </Button>
              
              <div className="flex items-center gap-2">
                <SortAsc size={16} className="text-gray-500" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedPackages.length} of {allTripPackages?.length || 0} packages
            </div>
          </div>
          
          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Price Range</label>
                    <div className="px-3">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={maxPrice}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setActiveFilter("all");
                        setPriceRange([0, maxPrice]);
                        setSortBy("price-asc");
                      }}
                      className="w-full"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Trip Packages Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96" />
              ))}
            </div>
          ) : filteredAndSortedPackages && filteredAndSortedPackages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedPackages.map((tripPackage) => (
                  <TripPackageCard
                    key={tripPackage.id}
                    tripPackage={tripPackage}
                    onBook={handleBookTrip}
                  />
                ))}
              </div>
              
              {/* Package Stats */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-primary">{filteredAndSortedPackages.length}</div>
                  <div className="text-sm text-gray-600">Available Packages</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-primary">
                    {new Set(filteredAndSortedPackages.map(p => p.location)).size}
                  </div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-primary">
                    ${Math.min(...filteredAndSortedPackages.map(p => parseFloat(p.price)))}
                  </div>
                  <div className="text-sm text-gray-600">Starting Price</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(filteredAndSortedPackages.reduce((sum, p) => sum + parseFloat(p.rating), 0) / filteredAndSortedPackages.length * 10) / 10}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <MapPin className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No packages found</h3>
              <p className="text-gray-600 mb-8">
                {searchTerm || activeFilter !== "all" || priceRange[0] > 0 || priceRange[1] < maxPrice
                  ? "Try adjusting your filters or search terms to find more packages."
                  : "We don't have any packages available yet. Check back soon!"}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                  setPriceRange([0, maxPrice]);
                }} variant="outline">
                  Clear Filters
                </Button>
                <Button onClick={() => window.location.href = "/contact"} variant="default">
                  Contact Us
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
