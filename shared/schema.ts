import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pledges = pgTable("pledges", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  state: text("state").notNull(),
  profileType: text("profile_type").notNull(),
  commitments: text("commitments").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPledgeSchema = createInsertSchema(pledges, {
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  state: z.string().min(1, "Please select a state"),
  profileType: z.enum(["Student", "Working Professional", "Other"], {
    required_error: "Please select your profile type",
  }),
  commitments: z.array(z.string()).min(1, "Please select at least one commitment"),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertPledge = z.infer<typeof insertPledgeSchema>;
export type Pledge = typeof pledges.$inferSelect;

// Public pledge type that excludes sensitive information
export type PublicPledge = Omit<Pledge, "email" | "mobile">;
