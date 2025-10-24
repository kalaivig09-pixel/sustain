import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Briefcase, School } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { TARGET_PLEDGES } from "@/lib/constants";

interface LiveKPIsProps {
  totalPledges: number;
  studentCount: number;
  professionalCount: number;
  workshopCount: number;
}

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{formatNumber(count)}</span>;
}

export function LiveKPIs({ totalPledges, studentCount, professionalCount, workshopCount }: LiveKPIsProps) {
  const kpis = [
    {
      icon: Users,
      label: "Total Pledges",
      value: totalPledges,
      testId: "kpi-total-pledges",
    },
    {
      icon: GraduationCap,
      label: "Students",
      value: studentCount,
      testId: "kpi-students",
    },
    {
      icon: Briefcase,
      label: "Working Professionals",
      value: professionalCount,
      testId: "kpi-professionals",
    },
    {
      icon: School,
      label: "Workshops",
      value: workshopCount,
      testId: "kpi-workshops",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Target Info */}
        <div className="text-center mb-12">
          <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wide mb-2" data-testid="text-goal-label">
            Our Collective Goal
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-target-pledges">
            <AnimatedCounter end={TARGET_PLEDGES} /> Pledges
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <Card
              key={kpi.label}
              className="p-8 flex flex-col items-center justify-center text-center hover-elevate"
              data-testid={kpi.testId}
            >
              <kpi.icon className="w-10 h-10 md:w-12 md:h-12 mb-4 text-primary" data-testid={`icon-${kpi.testId}`} />
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2" data-testid={`value-${kpi.testId}`}>
                <AnimatedCounter end={kpi.value} />
              </div>
              <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide" data-testid={`label-${kpi.testId}`}>
                {kpi.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
