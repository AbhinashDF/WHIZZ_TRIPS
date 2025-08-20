import HeroSection from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const stats = [
    { value: "10K+", label: "Happy Travelers" },
    { value: "50+", label: "Destinations" },
    { value: "13", label: "Years Experience" },
  ];

  const team = [
    {
      name: "Emily Martinez",
      role: "Founder & CEO",
      description: "Travel enthusiast with 15+ years in the industry. Specializes in luxury and adventure travel.",
      initials: "EM",
    },
    {
      name: "Robert Chen",
      role: "Head of Operations",
      description: "Expert in Asian destinations and cultural tours. Fluent in 4 languages.",
      initials: "RC",
    },
    {
      name: "Sofia Patel",
      role: "Travel Consultant",
      description: "Specializes in family travel and European destinations. Mother of three and adventure seeker.",
      initials: "SP",
    },
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for perfection in every detail of your journey.",
    },
    {
      title: "Authenticity",
      description: "We connect you with genuine local experiences and cultures.",
    },
    {
      title: "Sustainability",
      description: "We promote responsible travel that benefits local communities.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Wanderlust Travel</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're passionate about creating unforgettable travel experiences that connect you with the world's most beautiful destinations.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2010, Wanderlust Travel began as a small family business with a simple mission: to make extraordinary travel accessible to everyone. Over the years, we've helped thousands of travelers discover new cultures, create lasting memories, and fulfill their wanderlust.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Today, we're proud to be one of the leading travel agencies, offering personalized service and expertly crafted itineraries that go beyond the ordinary tourist experience.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Travel team working together"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate travel experts dedicated to your perfect journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.initials}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-primary text-white p-8 rounded-xl">
              <CardContent className="pt-0">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg">
                  To inspire and enable meaningful travel experiences that broaden perspectives, create connections, and build memories that last a lifetime.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6">
              {values.map((value, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
