import { z } from "zod";

// Profile types
export const profileTypes = ["Student", "Working Professional", "Other"] as const;

// Schema for inserting a new pledge
export const insertPledgeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().regex(/^\d{10}$/, "Please enter a valid mobile number"),
  state: z.string().min(1, "Please select a state"),
  profileType: z.enum(profileTypes, {
    required_error: "Please select your profile type",
  }),
  commitments: z.array(z.string()).min(1, "Please select at least one commitment"),
});

// Types
export type InsertPledge = z.infer<typeof insertPledgeSchema>;
export type Pledge = InsertPledge & {
  id: string;
  createdAt: Date;
};

// Public pledge type that excludes sensitive information
export type PublicPledge = Omit<Pledge, "email" | "mobile">;