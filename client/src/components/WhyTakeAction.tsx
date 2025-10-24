import { Leaf, Zap, Droplet, Wind } from "lucide-react";

const impactAreas = [
  {
    icon: Zap,
    title: "Energy",
    description: "Renewable energy transition",
  },
  {
    icon: Wind,
    title: "Air Quality",
    description: "Reduce carbon emissions",
  },
  {
    icon: Droplet,
    title: "Water",
    description: "Conservation and protection",
  },
  {
    icon: Leaf,
    title: "Nature",
    description: "Biodiversity restoration",
  },
];

export function WhyTakeAction() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
          Why Take Climate Action?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Impact Areas */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Your Impact Matters
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {impactAreas.map((area) => (
                <div
                  key={area.title}
                  className="flex flex-col items-center text-center p-4 rounded-lg hover-elevate"
                >
                  <area.icon className="w-8 h-8 mb-3 text-primary" />
                  <h4 className="font-semibold text-foreground mb-1">{area.title}</h4>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Personal Responsibility */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
              Individual to Global
            </h3>
            <p className="text-lg text-foreground leading-relaxed">
              Climate change is a global crisis, but individual actions add up to powerful
              collective impact.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              When you take a pledge, you're not just making a personal commitment—you're joining
              a movement of millions who believe that together, we can create lasting change for
              our planet.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every sustainable choice you make inspires others. Every action creates a ripple
              effect. Your pledge today becomes part of a global wave of positive change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
