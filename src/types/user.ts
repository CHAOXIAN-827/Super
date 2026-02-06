export interface TimelineEntry {
  id: string;
  date: string;
  type: "symptom" | "medication" | "checkup" | "note";
  title: string;
  description: string;
  tags?: string[];
}

export interface KnowledgeCard {
  id: string;
  category: "diet" | "medication" | "exercise" | "care";
  title: string;
  content: string;
  tags: string[];
  saved: boolean;
}

export interface PreparationChecklist {
  items: ChecklistItem[];
  symptomDescription: string;
  questionsForDoctor: string[];
  department: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: "document" | "item" | "information";
}
