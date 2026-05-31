import { Question, Answer } from '../types';

export function getRandomQuestions(
  allQuestions: Question[],
  count: number,
  difficulty?: 'easy' | 'medium' | 'hard'
): Question[] {
  let filtered = allQuestions;
  
  if (difficulty) {
    filtered = allQuestions.filter(q => q.difficulty === difficulty);
  }
  
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateFeedback(answer: string, question: Question): { rating: number; feedback: string; keywords: string[] } {
  const wordCount = answer.trim().split(/\s+/).length;
  const keywords: string[] = [];
  
  const keywordPatterns: Record<string, RegExp> = {
    'STAR Method': /situation|task|action|result/i,
    'Technical Depth': /architecture|scalability|performance|optimization/i,
    'Problem Solving': /approach|solution|strategy|analysis/i,
    'Communication': /collaborated|communicated|presented|discussed/i,
    'Leadership': /led|mentored|guided|initiated/i,
    'Specific Examples': /example|instance|project|experience/i,
    'Quantifiable Results': /increased|decreased|improved|reduced|\d+%|\d+ percent/i,
  };
  
  Object.entries(keywordPatterns).forEach(([keyword, pattern]) => {
    if (pattern.test(answer)) {
      keywords.push(keyword);
    }
  });
  
  let rating = 0;
  let feedback = '';
  
  if (wordCount < 20) {
    rating = 2;
    feedback = 'Your answer is quite brief. Consider elaborating more on the details and providing specific examples.';
  } else if (wordCount < 50) {
    rating = 3;
    feedback = 'Good start! Try to provide more context and specific details to strengthen your answer.';
  } else if (wordCount < 100) {
    rating = 4;
    feedback = 'Well-structured answer with good detail. Consider adding more quantifiable outcomes or results.';
  } else {
    rating = 5;
    feedback = 'Excellent comprehensive answer! You provided great detail and context. Keep practicing to maintain this level.';
  }
  
  if (keywords.length >= 3) {
    rating = Math.min(5, rating + 0.5);
    feedback += ' Great use of key concepts!';
  }
  
  return { rating: Math.round(rating), feedback, keywords };
}

export function calculateOverallScore(answers: Answer[]): number {
  if (answers.length === 0) return 0;
  const validAnswers = answers.filter(a => a.rating !== undefined);
  if (validAnswers.length === 0) return 0;
  
  const totalRating = validAnswers.reduce((sum, a) => sum + (a.rating || 0), 0);
  return Math.round((totalRating / validAnswers.length) * 20);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}