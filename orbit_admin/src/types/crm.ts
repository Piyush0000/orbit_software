import { Timestamp } from "firebase/firestore";

export type LeadStatus = "leads" | "contacted" | "won" | "lost";

export interface LeadData {
  id: string;
  name: string;
  formType: string;
  createdAt: string;
  timestamp: Timestamp | { seconds: number; nanoseconds: number } | string;
  status?: LeadStatus;
  collection?: string;
  // Book Demo fields
  phoneNumber?: string;
  category?: string;
  revenueRange?: string;
  // Contact Us fields
  workEmail?: string;
  email?: string;
  website?: string;
  budget?: string;
  goals?: string;
  message?: string;
}
