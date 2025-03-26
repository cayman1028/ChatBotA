export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  answer: string;
  nextQuestionId?: string;
}

export interface ChatHistory {
  questionId: string;
  selectedOptionId: string;
  timestamp: number;
}

export interface ChatbotState {
  currentQuestionId: string | null;
  history: ChatHistory[];
} 