export enum AppState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  DEMO = 'DEMO',
}

export enum NavState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  NAVIGATING = 'NAVIGATING',
  ARRIVED = 'ARRIVED',
}

export interface NavigationTarget {
  id: string;
  name: string;
  description: string;
}

export interface AIAnalysisResult {
  locationContext: string;
  confidence: number;
  detectedFeatures: string[];
}