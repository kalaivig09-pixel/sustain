import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getHeartRating, formatDate } from "@/lib/utils";
import { type PublicPledge } from "@shared/schema";
import { Loader2, Heart, Sprout } from "lucide-react";

interface PledgeWallProps {
  pledges: PublicPledge[];
  isLoading: boolean;
}

export function PledgeWall({ pledges, isLoading }: PledgeWallProps) {
  if (isLoading) {
    return (
      <section className="w-full py-16 md:py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Public Pledge Wall
          </h2>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  const sortedPledges = [...pledges].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Public Pledge Wall
        </h2>

        {sortedPledges.length === 0 ? (
          <div className="text-center py-20" data-testid="empty-state-pledge-wall">
            <Sprout className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Be the First to Take Action!
            </h3>
            <p className="text-muted-foreground">
              No pledges yet. Take the climate pledge and inspire others to join the movement.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <Table data-testid="table-pledge-wall">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Pledge ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead className="text-center">Love for Planet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPledges.map((pledge, index) => (
                    <TableRow
                      key={pledge.id}
                      className="hover-elevate"
                      data-testid={`row-pledge-${pledge.id}`}
                    >
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        #{String(sortedPledges.length - index).padStart(4, "0")}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        {pledge.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(pledge.createdAt)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{pledge.state}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal" data-testid={`badge-profile-${pledge.id}`}>
                          {pledge.profileType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1" data-testid={`hearts-${pledge.id}`}>
                          {Array.from({ length: getHeartRating(pledge.commitments.length) }).map((_, i) => (
                            <Heart key={i} className="w-6 h-6 fill-primary text-primary" />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {sortedPledges.map((pledge, index) => (
                <Card
                  key={pledge.id}
                  className="p-6"
                  data-testid={`card-pledge-${pledge.id}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1" data-testid={`text-pledge-id-${pledge.id}`}>
                        #{String(sortedPledges.length - index).padStart(4, "0")}
                      </p>
                      <h3 className="font-semibold text-lg text-foreground" data-testid={`text-pledge-name-${pledge.id}`}>{pledge.name}</h3>
                    </div>
                    <div className="flex gap-1" data-testid={`hearts-mobile-${pledge.id}`}>
                      {Array.from({ length: getHeartRating(pledge.commitments.length) }).map((_, i) => (
                        <Heart key={i} className="w-6 h-6 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="text-foreground" data-testid={`text-date-${pledge.id}`}>{formatDate(pledge.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">State:</span>
                      <span className="text-foreground" data-testid={`text-state-${pledge.id}`}>{pledge.state}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Profile:</span>
                      <Badge variant="secondary" className="font-normal" data-testid={`badge-profile-mobile-${pledge.id}`}>
                        {pledge.profileType}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
