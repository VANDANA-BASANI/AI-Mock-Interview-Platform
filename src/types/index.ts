export interface Question {
  id: string;
  category: 'technical' | 'behavioral' | 'situational';
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips?: string;
}

export interface InterviewSession {
  id: string;
  role: string;
  company: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  status: 'setup' | 'in-progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
}

export interface Answer {
  questionId: string;
  content: string;
  rating?: number;
  feedback?: string;
  keywords?: string[];
}

export interface InterviewStats {
  totalSessions: number;
  averageScore: number;
  strongAreas: string[];
  improvementAreas: string[];
  recentSessions: SessionSummary[];
}

export interface SessionSummary {
  id: string;
  role: string;
  company: string;
  score: number;
  date: Date;
  duration: number;
}