import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/HeroSection";
import { LiveKPIs } from "@/components/LiveKPIs";
import { WhyTakeAction } from "@/components/WhyTakeAction";
import { PledgeForm } from "@/components/PledgeForm";
import { CertificateModal } from "@/components/CertificateModal";
import { PledgeWall } from "@/components/PledgeWall";
import { Footer } from "@/components/Footer";
import { type InsertPledge, type PublicPledge } from "@shared/schema";

interface KPIStats {
  totalPledges: number;
  studentCount: number;
  professionalCount: number;
  workshopCount: number;
}

export default function Home() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [submittedPledge, setSubmittedPledge] = useState<InsertPledge | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pledgeFormRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  // Fetch KPI stats
  const { data: kpiStats } = useQuery<KPIStats>({
    queryKey: ["/api/pledges/stats"],
  });

  // Fetch public pledges
  const { data: pledges = [], isLoading: pledgesLoading } = useQuery<PublicPledge[]>({
    queryKey: ["/api/pledges"],
  });

  const handleTakePledge = () => {
    pledgeFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePledgeSubmit = async (data: InsertPledge) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/pledges", data);
      
      setSubmittedPledge(data);
      setShowCertificate(true);
      
      await queryClient.invalidateQueries({ queryKey: ["/api/pledges"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/pledges/stats"] });
      
      toast({
        title: "Pledge Submitted Successfully! 🌍",
        description: "Thank you for taking action for our planet. Your certificate is ready!",
      });
    } catch (error) {
      console.error("Error submitting pledge:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your pledge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
    setSubmittedPledge(null);
    setTimeout(() => {
      const pledgeWallSection = document.querySelector('[data-testid="table-pledge-wall"]');
      pledgeWallSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onTakePledge={handleTakePledge} />

      {/* Live KPIs */}
      <LiveKPIs
        totalPledges={kpiStats?.totalPledges || 0}
        studentCount={kpiStats?.studentCount || 0}
        professionalCount={kpiStats?.professionalCount || 0}
        workshopCount={kpiStats?.workshopCount || 0}
      />

      {/* Why Take Climate Action */}
      <WhyTakeAction />

      {/* Pledge Form */}
      <section ref={pledgeFormRef}>
        <PledgeForm onSubmit={handlePledgeSubmit} isSubmitting={isSubmitting} />
      </section>

      {/* Public Pledge Wall */}
      <PledgeWall pledges={pledges} isLoading={pledgesLoading} />

      {/* Footer with Privacy Notice */}
      <Footer />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={handleCloseCertificate}
        pledgeData={submittedPledge}
      />
    </div>
  );
}
