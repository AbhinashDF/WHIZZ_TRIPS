import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import TripPackageCard from "@/components/trip-package-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TripPackage } from "@shared/schema";

export default function Trips() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: tripPackages, isLoading } = useQuery<TripPackage[]>({
    queryKey: ["/api/trip-packages", activeFilter !== "all" ? { category: activeFilter } : {}],
  });

  const filters = [
    { id: "all", label: "All Packages" },
    { id: "luxury", label: "Luxury" },
    { id: "adventure", label: "Adventure" },
    { id: "family", label: "Family" },
    { id: "cultural", label: "Cultural" },
  ];

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

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-colors",
                  activeFilter === filter.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
                onClick={() => handleFilterChange(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
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
          ) : tripPackages && tripPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tripPackages.map((tripPackage) => (
                <TripPackageCard
                  key={tripPackage.id}
                  tripPackage={tripPackage}
                  onBook={handleBookTrip}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No packages found</h3>
              <p className="text-gray-600 mb-8">
                We don't have any packages in this category yet. Check back soon!
              </p>
              <Button onClick={() => handleFilterChange("all")} variant="outline">
                Show All Packages
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
