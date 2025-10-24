import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPledgeSchema, type InsertPledge } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { INDIAN_STATES, COMMITMENT_THEMES } from "@/lib/constants";
import { Home, Car, ShoppingBag, Lock } from "lucide-react";

interface PledgeFormProps {
  onSubmit: (data: InsertPledge) => void;
  isSubmitting: boolean;
}

const iconMap: Record<string, any> = {
  Home,
  Car,
  ShoppingBag,
};

export function PledgeForm({ onSubmit, isSubmitting }: PledgeFormProps) {
  const form = useForm<InsertPledge>({
    resolver: zodResolver(insertPledgeSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      state: "",
      profileType: undefined,
      commitments: [],
    },
  });

  const handleSubmit = (data: InsertPledge) => {
    onSubmit(data);
  };

  return (
    <section id="pledge-form" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Take Your Climate Pledge
          </h2>
          <p className="text-lg text-muted-foreground">
            Make your commitment to climate action and inspire others to join the movement
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      className="h-12"
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="your.email@example.com"
                      className="h-12"
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile Number Field */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Mobile Number *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="10-digit mobile number"
                      className="h-12"
                      data-testid="input-mobile"
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                    <Lock className="w-3 h-3" />
                    Mobile and email are required for validation but never shown publicly
                  </p>
                </FormItem>
              )}
            />

            {/* State Field */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">State *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12" data-testid="select-state">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Type Field */}
            <FormField
              control={form.control}
              name="profileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Profile Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12" data-testid="select-profile-type">
                        <SelectValue placeholder="Select your profile" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Working Professional">Working Professional</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Commitment Themes */}
            <div className="space-y-8 pt-8">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  Your Climate Commitments
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select the actions you commit to taking for our planet
                </p>
              </div>

              <FormField
                control={form.control}
                name="commitments"
                render={() => (
                  <FormItem>
                    {COMMITMENT_THEMES.map((theme, themeIndex) => {
                      const IconComponent = iconMap[theme.icon];
                      return (
                        <div
                          key={theme.title}
                          className={`${themeIndex > 0 ? "border-t pt-8 mt-8" : ""}`}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            {IconComponent && (
                              <IconComponent className="w-6 h-6 text-primary" />
                            )}
                            <h4 className="text-lg font-semibold text-foreground">
                              {theme.title}
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {theme.commitments.map((commitment) => (
                              <FormField
                                key={commitment}
                                control={form.control}
                                name="commitments"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={commitment}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(commitment)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, commitment])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== commitment
                                                  )
                                                );
                                          }}
                                          className="w-5 h-5 mt-0.5"
                                          data-testid={`checkbox-${commitment.toLowerCase().replace(/\s+/g, "-")}`}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal text-base cursor-pointer">
                                        {commitment}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-12">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto md:px-12 md:py-4 text-lg font-semibold min-h-[48px]"
                disabled={isSubmitting}
                data-testid="button-submit-pledge"
              >
                {isSubmitting ? "Submitting..." : "Submit My Pledge"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
