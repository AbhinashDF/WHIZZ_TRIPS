import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, CreditCard, Building, Smartphone, Shield, Lock } from "lucide-react";
import { Link } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { TripPackage } from "@shared/schema";

const paymentSchema = z.object({
  paymentMethod: z.enum(["credit-card", "debit-card", "net-banking", "upi"]),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
  bankName: z.string().optional(),
  upiId: z.string().optional(),
  billingAddress: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Invalid phone number"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(5, "Invalid zip code"),
    country: z.string().min(1, "Country is required"),
  }),
});

type PaymentData = z.infer<typeof paymentSchema>;

export default function Payment() {
  const [selectedPackage, setSelectedPackage] = useState<TripPackage | null>(null);
  const [travelers, setTravelers] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const { toast } = useToast();

  // Get booking details from URL
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get('package');
  const flightId = urlParams.get('id');
  const hotelId = urlParams.get('id');
  const bookingType = urlParams.get('type') || 'package';
  const urlTravelers = parseInt(urlParams.get('travelers') || '1');
  const urlPrice = urlParams.get('price');

  const { data: tripPackage } = useQuery<TripPackage>({
    queryKey: ["/api/trip-packages", packageId],
    queryFn: async () => {
      const response = await fetch(`/api/trip-packages/${packageId}`);
      return response.json();
    },
    enabled: !!packageId && bookingType === 'package',
  });

  const { data: flight } = useQuery({
    queryKey: ["/api/flights", flightId],
    queryFn: async () => {
      const response = await fetch("/api/flights");
      const flights = await response.json();
      return flights.find((f: any) => f.id === flightId);
    },
    enabled: !!flightId && bookingType === 'flight',
  });

  const { data: hotel } = useQuery({
    queryKey: ["/api/hotels", hotelId],
    queryFn: async () => {
      const response = await fetch("/api/hotels");
      const hotels = await response.json();
      return hotels.find((h: any) => h.id === hotelId);
    },
    enabled: !!hotelId && bookingType === 'hotel',
  });

  const form = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "credit-card",
      billingAddress: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    if (bookingType === 'package' && tripPackage) {
      setSelectedPackage(tripPackage);
      setTravelers(urlTravelers);
      setTotalAmount(parseFloat(tripPackage.price) * urlTravelers);
    } else if (bookingType === 'flight' && flight) {
      setSelectedPackage({ 
        ...flight, 
        title: `${flight.airline} Flight`, 
        location: `${flight.from} to ${flight.to}`,
        duration: flight.duration,
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&h=200'
      });
      setTravelers(urlTravelers);
      setTotalAmount(parseFloat(urlPrice || flight.price));
    } else if (bookingType === 'hotel' && hotel) {
      setSelectedPackage({
        ...hotel,
        title: hotel.name,
        location: hotel.location,
        duration: '1 night',
        price: hotel.pricePerNight
      });
      setTravelers(urlTravelers);
      setTotalAmount(parseFloat(urlPrice || hotel.pricePerNight));
    }
  }, [tripPackage, flight, hotel, urlTravelers, urlPrice, bookingType]);

  const paymentMutation = useMutation({
    mutationFn: async (data: PaymentData) => {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, transactionId: `TXN${Date.now()}` };
    },
    onSuccess: (result) => {
      toast({
        title: "Payment Successful!",
        description: `Transaction ID: ${result.transactionId}. Your booking has been confirmed.`,
      });
      // Redirect to success page or booking confirmation
      setTimeout(() => {
        window.location.href = `/booking-confirmation?transaction=${result.transactionId}`;
      }, 2000);
    },
    onError: () => {
      toast({
        title: "Payment Failed",
        description: "Please check your payment details and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PaymentData) => {
    paymentMutation.mutate(data);
  };

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express"
    },
    {
      id: "debit-card",
      name: "Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard Debit"
    },
    {
      id: "net-banking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks supported"
    },
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay using UPI ID"
    }
  ];

  const taxes = totalAmount * 0.12; // 12% tax
  const processingFee = 25;
  const finalAmount = totalAmount + taxes + processingFee;

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading booking details...</h1>
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link href="/booking" className="inline-flex items-center text-primary hover:text-primary/80">
          <ArrowLeft size={20} className="mr-2" />
          Back to Booking
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 text-primary" size={24} />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Payment Method Selection */}
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Select Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                              {paymentMethods.map((method) => {
                                const IconComponent = method.icon;
                                return (
                                  <Label
                                    key={method.id}
                                    htmlFor={method.id}
                                    className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                                  >
                                    <RadioGroupItem value={method.id} id={method.id} />
                                    <IconComponent size={24} className="text-primary" />
                                    <div>
                                      <div className="font-semibold">{method.name}</div>
                                      <div className="text-sm text-gray-600">{method.description}</div>
                                    </div>
                                  </Label>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Details */}
                    {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Card Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardholderName"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "net-banking" && (
                      <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Bank</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose your bank" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                <SelectItem value="icici">ICICI Bank</SelectItem>
                                <SelectItem value="sbi">State Bank of India</SelectItem>
                                <SelectItem value="axis">Axis Bank</SelectItem>
                                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                                <SelectItem value="other">Other Banks</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {paymentMethod === "upi" && (
                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UPI ID</FormLabel>
                            <FormControl>
                              <Input placeholder="yourname@paytm" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <Separator />

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Billing Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="billingAddress.fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="billingAddress.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="billingAddress.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="billingAddress.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="billingAddress.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="billingAddress.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="billingAddress.zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="billingAddress.country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="United States">United States</SelectItem>
                                  <SelectItem value="Canada">Canada</SelectItem>
                                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                  <SelectItem value="India">India</SelectItem>
                                  <SelectItem value="Australia">Australia</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 text-lg"
                      disabled={paymentMutation.isPending}
                    >
                      {paymentMutation.isPending ? "Processing Payment..." : `Pay $${finalAmount.toFixed(2)}`}
                      <Shield className="ml-2" size={20} />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex">
                    <img
                      src={selectedPackage.imageUrl}
                      alt={selectedPackage.title}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{selectedPackage.title}</h3>
                      <p className="text-xs text-gray-600">{selectedPackage.location}</p>
                      <p className="text-xs text-gray-600">{selectedPackage.duration} days</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Package Price × {travelers}</span>
                      <span>${(parseFloat(selectedPackage.price) * travelers).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>${processingFee.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${finalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    <p>✅ Free cancellation up to 24 hours</p>
                    <p>✅ Instant confirmation</p>
                    <p>✅ Secure payment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}