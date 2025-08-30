import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  showCta?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText = "Start Your Journey",
  ctaLink = "/trips",
  showCta = true,
}: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{subtitle}</p>
        {showCta && (
          <Link href={ctaLink}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg text-lg"
            >
              {ctaText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
