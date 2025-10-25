import { useRef } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Download, X, Globe, Heart } from "lucide-react";
import { getHeartRating, formatDate } from "../lib/utils";
import { type InsertPledge } from "../shared/schema";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  pledgeData: InsertPledge | null;
}

export function CertificateModal({ isOpen, onClose, pledgeData }: CertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!pledgeData) return null;

  const heartRating = getHeartRating(pledgeData.commitments.length);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `climate-pledge-certificate-${pledgeData.name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');

      // Create a PDF with jsPDF sized to A4 and insert the image scaled to fit
      const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Compute image dimensions to fit within page with small margin
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
      const renderWidth = imgWidth * ratio;
      const renderHeight = imgHeight * ratio;

      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);

      const fileName = `climate-pledge-certificate-${pledgeData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF certificate:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden" data-testid="modal-certificate">
        <div className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
            data-testid="button-close-certificate"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Certificate Container */}
          <div className="p-8 md:p-12 bg-background">
            <div
              ref={certificateRef}
              className="bg-card border-4 border-primary p-12 md:p-16 rounded-lg"
              data-testid="certificate-content"
            >
              {/* Certificate Header */}
              <div className="text-center mb-8">
                <Globe className="w-16 h-16 mx-auto mb-4 text-primary" data-testid="icon-globe" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Climate Action Pledge Certificate
                </h2>
                <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
              </div>

              {/* Certificate Content */}
              <div className="text-center space-y-6">
                <p className="text-lg text-muted-foreground">This certifies that</p>

                <h3
                  className="text-4xl md:text-5xl font-bold text-foreground"
                  data-testid="text-certificate-name"
                >
                  {pledgeData.name}
                </h3>

                <p className="text-2xl font-semibold text-primary">
                  is Cool Enough to Care!
                </p>

                <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  has pledged to take meaningful climate action by committing to{" "}
                  <span className="font-semibold text-foreground">
                    {pledgeData.commitments.length} sustainable practices
                  </span>{" "}
                  for a better planet.
                </p>

                {/* Heart Rating */}
                <div className="py-6">
                  <p className="text-sm text-muted-foreground mb-2">Love for Planet Rating</p>
                  <div
                    className="flex justify-center gap-2"
                    data-testid="text-certificate-hearts"
                  >
                    {Array.from({ length: heartRating }).map((_, i) => (
                      <Heart key={i} className="w-12 h-12 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Pledged on {formatDate(new Date())}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={handleDownload}
                className="min-h-[48px] px-8"
                data-testid="button-download-certificate"
              >
                <Download className="mr-2 w-5 h-5" />
                Download Certificate
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownloadPDF}
                className="min-h-[48px] px-8"
                data-testid="button-download-pdf"
              >
                <Download className="mr-2 w-5 h-5" />
                Download as PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onClose}
                className="min-h-[48px] px-8"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
