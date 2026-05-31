import { useState, useCallback } from 'react';
import { SetupForm } from './components/SetupForm';
import { InterviewSession } from './components/InterviewSession';
import { ResultsView } from './components/ResultsView';
import { InterviewSession as ISession, Answer, Question } from './types';
import { questions as allQuestions } from './data/questions';
import { getRandomQuestions } from './utils/helpers';

type AppView = 'setup' | 'interview' | 'results';

export default function App() {
  const [view, setView] = useState<AppView>('setup');
  const [currentSession, setCurrentSession] = useState<ISession | null>(null);
  const [sessionAnswers, setSessionAnswers] = useState<Answer[]>([]);

  const handleStartInterview = useCallback((
    role: string,
    company: string,
    difficulty: 'easy' | 'medium' | 'hard',
    questionCount: number
  ) => {
    const selectedQuestions = getRandomQuestions(allQuestions, questionCount, difficulty);
    
    const newSession: ISession = {
      id: `session-${Date.now()}`,
      role,
      company,
      difficulty,
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: [],
      status: 'in-progress',
      startTime: new Date()
    };

    setCurrentSession(newSession);
    setSessionAnswers([]);
    setView('interview');
  }, []);

  const handleCompleteInterview = useCallback((answers: Answer[]) => {
    setSessionAnswers(answers);
    setView('results');
  }, []);

  const handleCancelInterview = useCallback(() => {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
      setView('setup');
      setCurrentSession(null);
      setSessionAnswers([]);
    }
  }, []);

  const handleRestart = useCallback(() => {
    setView('setup');
    setCurrentSession(null);
    setSessionAnswers([]);
  }, []);

  if (view === 'setup') {
    return <SetupForm onStart={handleStartInterview} />;
  }

  if (view === 'interview' && currentSession) {
    return (
      <InterviewSession
        session={currentSession}
        onComplete={handleCompleteInterview}
        onCancel={handleCancelInterview}
      />
    );
  }

  if (view === 'results' && currentSession) {
    return (
      <ResultsView
        session={currentSession}
        answers={sessionAnswers}
        onRestart={handleRestart}
        onHome={handleRestart}
      />
    );
  }

  return null;
}