import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, CheckCircle } from "lucide-react";
import OfficeMap from "@/components/office-map";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      newsletter: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Travel Street", "New York, NY 10001", "United States"],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["Main: +1 (555) 123-4567", "Emergency: +1 (555) 987-6543"],
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["info@whizztravels.com", "bookings@whizztravels.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 7:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/whizztravels" },
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/whizztravels" },
    { icon: Twitter, label: "Twitter", url: "https://www.twitter.com/whizztravels" },
    { icon: Youtube, label: "YouTube", url: "https://www.youtube.com/c/whizztravels" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions about your next adventure? Our travel experts are here to help you plan the perfect trip.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <IconComponent className="text-primary text-xl mr-4 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                        <div className="text-gray-600">
                          {info.details.map((detail, i) => (
                            <p key={i}>{detail}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                        aria-label={`Follow us on ${social.label}`}
                        data-testid={`link-${social.label.toLowerCase()}`}
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white rounded-xl shadow-lg p-8">
              <CardContent className="pt-0">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="booking">Booking Inquiry</SelectItem>
                              <SelectItem value="package">Package Information</SelectItem>
                              <SelectItem value="support">Customer Support</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={5} 
                              placeholder="Tell us about your travel plans or questions..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newsletter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-600">
                              Subscribe to our newsletter for travel deals and updates
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg text-lg"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      <span className="text-green-700">
                        Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600">Come see us in person to plan your perfect getaway</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <OfficeMap 
                address="123 Travel Street, New York, NY 10001"
                city="New York"
                coordinates={{ lat: 40.7128, lng: -74.0060 }}
              />
            </div>
            
            {/* Office Details */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Office Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600 text-sm">123 Travel Street<br />New York, NY 10001<br />United States</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-primary mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-primary mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Contact</p>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>Main: +1 (555) 123-4567</p>
                        <p>Emergency: +1 (555) 987-6543</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Getting Here</h4>
                <div className="text-amber-700 text-sm space-y-1">
                  <p>🚇 Subway: Union Square (4,5,6,L,N,Q,R,W)</p>
                  <p>🚌 Bus: Multiple routes available</p>
                  <p>🚗 Parking: Street parking & nearby garages</p>
                  <p>🚶 Walkable from major attractions</p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Services Available</h4>
                <div className="text-green-700 text-sm space-y-1">
                  <p>✓ In-person travel consultation</p>
                  <p>✓ Trip planning & booking</p>
                  <p>✓ Travel document assistance</p>
                  <p>✓ Group booking services</p>
                  <p>✓ Emergency travel support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
