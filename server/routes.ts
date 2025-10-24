import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPledgeSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit a new pledge
  app.post("/api/pledges", async (req, res) => {
    try {
      const validatedData = insertPledgeSchema.parse(req.body);
      const pledge = await storage.createPledge(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Pledge submitted successfully",
        pledgeId: pledge.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      console.error("Error creating pledge:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to submit pledge" 
      });
    }
  });

  // Get all public pledges (excluding email and mobile)
  app.get("/api/pledges", async (req, res) => {
    try {
      const publicPledges = await storage.getPublicPledges();
      res.json(publicPledges);
    } catch (error) {
      console.error("Error fetching pledges:", error);
      res.status(500).json({ error: "Failed to fetch pledges" });
    }
  });

  // Get pledge statistics for KPIs
  app.get("/api/pledges/stats", async (req, res) => {
    try {
      const stats = await storage.getPledgeStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
