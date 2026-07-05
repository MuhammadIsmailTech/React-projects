export interface ProConItem {
  id: string;
  type: 'pro' | 'con';
  option: string; // Option name, or "General" if single option
  title: string;
  description: string;
  weight: number; // 1 to 5 scale
  category: string; // e.g., Financial, Career, Lifestyle, Social, etc.
}

export interface ComparisonCriterion {
  criterion: string;
  description: string;
  optionScores: { [optionName: string]: number }; // Score 1-5
  optionDetails: { [optionName: string]: string }; // Details
  importance: number; // Importance rating 1-5
}

export interface SWOTQuadrant {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface CognitiveBias {
  name: string;
  description: string;
  advice: string;
}

export interface DecisionVerdict {
  recommendation: string;
  confidence: number; // Percentage
  explanation: string;
  actionSteps: string[];
  cognitiveBiases: CognitiveBias[];
}

export interface DecisionAnalysis {
  id: string;
  title: string;
  description: string;
  options: string[];
  prosCons: ProConItem[];
  criteria: ComparisonCriterion[];
  swot: { [optionName: string]: SWOTQuadrant }; // SWOT per option
  verdict: DecisionVerdict;
  createdAt?: string;
}

export interface SavedDecision {
  id: string;
  title: string;
  options: string[];
  analysis: DecisionAnalysis;
  userNotes: string;
  customProsCons: ProConItem[]; // For user-added items or overridden weights
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
