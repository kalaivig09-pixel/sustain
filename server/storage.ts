import { type Pledge, type InsertPledge, type PublicPledge } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createPledge(pledge: InsertPledge): Promise<Pledge>;
  getAllPledges(): Promise<Pledge[]>;
  getPublicPledges(): Promise<PublicPledge[]>;
  getPledgeStats(): Promise<{
    totalPledges: number;
    studentCount: number;
    professionalCount: number;
    workshopCount: number;
  }>;
}

export class MemStorage implements IStorage {
  private pledges: Map<string, Pledge>;

  constructor() {
    this.pledges = new Map();
  }

  async createPledge(insertPledge: InsertPledge): Promise<Pledge> {
    const id = randomUUID();
    const pledge: Pledge = {
      ...insertPledge,
      id,
      createdAt: new Date(),
    };
    this.pledges.set(id, pledge);
    return pledge;
  }

  async getAllPledges(): Promise<Pledge[]> {
    return Array.from(this.pledges.values());
  }

  async getPublicPledges(): Promise<PublicPledge[]> {
    const allPledges = await this.getAllPledges();
    return allPledges.map(({ email, mobile, ...publicData }) => publicData);
  }

  async getPledgeStats() {
    const allPledges = await this.getAllPledges();
    
    const studentCount = allPledges.filter(p => p.profileType === "Student").length;
    const professionalCount = allPledges.filter(p => p.profileType === "Working Professional").length;
    const otherCount = allPledges.filter(p => p.profileType === "Other").length;

    return {
      totalPledges: allPledges.length,
      studentCount,
      professionalCount,
      workshopCount: 0,
    };
  }
}

export const storage = new MemStorage();
