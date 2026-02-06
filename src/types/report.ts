export interface MedicalReport {
  id: string;
  title: string;
  imageUrl?: string;
  ocrText: string;
  analysis: ReportAnalysis | null;
  createdAt: string;
}

export interface ReportAnalysis {
  elderlyExplanation: string;
  familyExplanation: string;
  medicalTerms: MedicalTerm[];
  abnormalIndicators: AbnormalIndicator[];
  healthSuggestions: string[];
  summary: string;
}

export interface MedicalTerm {
  term: string;
  explanation: string;
}

export interface AbnormalIndicator {
  name: string;
  value: string;
  normalRange: string;
  level: "high" | "low" | "critical";
  explanation: string;
}
