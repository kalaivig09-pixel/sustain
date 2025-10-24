import { Lock, Shield, Eye } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-16 bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Privacy Statement */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Data Protection
            </h3>
            <div className="prose prose-sm max-w-prose space-y-3 text-muted-foreground">
              <p className="flex items-start gap-2">
                <Lock className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Your data is secure:</strong> Mobile number
                  and email are required for validation but are never shown publicly.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Eye className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">What we display:</strong> Only your name,
                  state, profile type, pledge date, and commitment rating appear on the public
                  pledge wall.
                </span>
              </p>
              <p>
                <strong className="text-foreground">Purpose:</strong> Data is used solely for
                verification and engagement to build a genuine community of climate action
                champions.
              </p>
            </div>
          </div>

          {/* About & Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">
              About Climate Action Pledge
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A community-driven initiative to inspire and track collective climate action. Every
              pledge counts, every action matters, and together we can create meaningful change
              for our planet.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Target:</strong> 1,000,000 pledges
              </p>
              <p>
                <strong className="text-foreground">Mission:</strong> Make climate action visible,
                tangible, and inspiring
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Climate Action Pledge. Together for a sustainable
            future.
          </p>
        </div>
      </div>
    </footer>
  );
}
