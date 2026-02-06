export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface TriageResult {
  possibleConditions: PossibleCondition[];
  recommendedDepartment: string;
  urgencyLevel: UrgencyLevel;
  additionalAdvice: string;
}

export interface PossibleCondition {
  name: string;
  probability: "high" | "medium" | "low";
  description: string;
}

export type UrgencyLevel = "emergency" | "urgent" | "routine" | "self-care";

export function getUrgencyLabel(level: UrgencyLevel): string {
  const labels: Record<UrgencyLevel, string> = {
    emergency: "立即就医",
    urgent: "尽快就医",
    routine: "择期就医",
    "self-care": "居家观察",
  };
  return labels[level];
}

export function getUrgencyColor(level: UrgencyLevel): string {
  const colors: Record<UrgencyLevel, string> = {
    emergency: "text-red-600 bg-red-50 border-red-200",
    urgent: "text-orange-600 bg-orange-50 border-orange-200",
    routine: "text-blue-600 bg-blue-50 border-blue-200",
    "self-care": "text-green-600 bg-green-50 border-green-200",
  };
  return colors[level];
}
