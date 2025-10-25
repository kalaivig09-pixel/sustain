const heroImage = "/assets/images/hero-background.jpg";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onTakePledge: () => void;
}

export function HeroSection({ onTakePledge }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Diverse young people taking climate action"
          className="w-full h-full object-cover opacity-80"
          data-testid="img-hero-background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight" data-testid="text-hero-headline">
          Every Action Counts
          <br />
          <span className="text-primary">For Our Planet</span>
        </h1>
        <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-8 leading-relaxed" data-testid="text-hero-subheadline">
          Join thousands of students and professionals making a difference. Take your climate
          pledge today and inspire others to protect our planet together.
        </p>
        <Button
          size="lg"
          onClick={onTakePledge}
          className="px-8 py-4 text-lg font-semibold backdrop-blur-md bg-primary hover:bg-primary/90 border border-primary-border min-h-[48px] group"
          data-testid="button-take-pledge"
        >
          Take the Pledge
          <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}
