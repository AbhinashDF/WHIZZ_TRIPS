import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle, Download, Mail, Calendar, MapPin, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function BookingConfirmation() {
  const [transactionId, setTransactionId] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState({
    bookingRef: "",
    confirmationCode: "",
    travelDate: "",
    packageName: "",
    destination: "",
    duration: "",
    travelers: 1,
    totalAmount: 0,
    customerName: "",
    customerEmail: "",
  });

  useEffect(() => {
    // Get transaction ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const txnId = urlParams.get('transaction') || '';
    setTransactionId(txnId);
    
    // Generate booking details (in real app, this would come from API)
    const bookingRef = `WHZ${Date.now().toString().slice(-6)}`;
    const confirmationCode = `WH${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    setBookingDetails({
      bookingRef,
      confirmationCode,
      travelDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      packageName: "Maldives Paradise Retreat",
      destination: "Maldives",
      duration: "7 days",
      travelers: 2,
      totalAmount: 5247.50,
      customerName: "John Doe",
      customerEmail: "john.doe@email.com",
    });
  }, []);

  const handleDownloadTicket = () => {
    // Create a simple text receipt
    const receipt = `
WHIZZ TRAVELS - BOOKING CONFIRMATION
====================================

Booking Reference: ${bookingDetails.bookingRef}
Confirmation Code: ${bookingDetails.confirmationCode}
Transaction ID: ${transactionId}

Travel Package: ${bookingDetails.packageName}
Destination: ${bookingDetails.destination}
Duration: ${bookingDetails.duration}
Travelers: ${bookingDetails.travelers}
Travel Date: ${bookingDetails.travelDate}

Total Amount Paid: $${bookingDetails.totalAmount}

Customer Details:
Name: ${bookingDetails.customerName}
Email: ${bookingDetails.customerEmail}

Thank you for choosing WHIZZ TRAVELS!
Contact us: info@whizztravels.com
`;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WHIZZ_TRAVELS_${bookingDetails.bookingRef}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const nextSteps = [
    {
      title: "Check Your Email",
      description: "We've sent detailed itinerary and travel documents to your email",
      icon: Mail,
    },
    {
      title: "Prepare for Travel",
      description: "Check passport validity and visa requirements for your destination",
      icon: Calendar,
    },
    {
      title: "Contact Support",
      description: "Have questions? Our travel experts are here to help 24/7",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Your payment has been processed successfully. Get ready for an amazing journey!
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Booking Details</span>
              <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Booking Reference</label>
                  <p className="text-lg font-semibold text-gray-900">{bookingDetails.bookingRef}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Confirmation Code</label>
                  <p className="text-lg font-semibold text-gray-900">{bookingDetails.confirmationCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                  <p className="text-sm text-gray-700">{transactionId}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary mr-2" />
                  <div>
                    <p className="font-semibold">{bookingDetails.packageName}</p>
                    <p className="text-sm text-gray-600">{bookingDetails.destination}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-primary mr-2" />
                  <div>
                    <p className="font-semibold">Travel Date</p>
                    <p className="text-sm text-gray-600">{bookingDetails.travelDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <div>
                    <p className="font-semibold">{bookingDetails.travelers} Travelers</p>
                    <p className="text-sm text-gray-600">{bookingDetails.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold">Total Paid: ${bookingDetails.totalAmount}</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleDownloadTicket}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Receipt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Travel Documents</h4>
                <p>Please ensure your passport is valid for at least 6 months from your travel date. Visa requirements may apply for your destination.</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Cancellation Policy</h4>
                <p>Free cancellation up to 72 hours before departure. Cancellations after this period may incur charges.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Travel Insurance</h4>
                <p>We recommend purchasing travel insurance to protect your trip investment. Contact us for insurance options.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link href="/trips">
            <Button size="lg">
              Book Another Trip
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}