import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Clock, ArrowRight, Check, X, Lightbulb } from 'lucide-react';
import { InterviewSession as ISession, Answer } from '../types';
import { generateFeedback, formatTime } from '../utils/helpers';

interface InterviewSessionProps {
  session: ISession;
  onComplete: (answers: Answer[]) => void;
  onCancel: () => void;
}

export function InterviewSession({ session, onComplete, onCancel }: InterviewSessionProps) {
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showTip, setShowTip] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = session.questions[currentIndex];
  const progress =((currentIndex + 1) /session.questions.length) * 100;
  const isLastQuestion =currentIndex === session.questions.length - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'hard': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return '💻';
      case 'behavioral': return '🤝';
      case 'situational': return '🎯';
      default: return '📝';
    }
  };

  const handleSubmitAnswer = () => {
    const feedback = generateFeedback(currentAnswer, currentQuestion);
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      content: currentAnswer,
      ...feedback
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setCurrentAnswer('');
    setShowTip(false);

    if (isLastQuestion) {
      onComplete(newAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 px-3 py-1 rounded-lg text-white font-medium">
              {session.role}
            </div>
            <div className="text-slate-400">@ {session.company}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-white font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <X className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800">
        <div className="h-1 bg-slate-700">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-2 flex justify-between text-sm text-slate-400">
          <span> Question {currentIndex + 1} of {session.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getCategoryIcon(currentQuestion.category)}</span>
                <div>
                  <CardTitle className="text-white text-xl">
                     Question {currentIndex + 1}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(currentQuestion.difficulty)}`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="text-slate-400 text-xs capitalize">
                      {currentQuestion.category}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowTip(!showTip)}
                className="text-amber-400 hover:bg-amber-400/10"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Hint
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <p className="text-white text-lg leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {showTip && currentQuestion.tips && (
              <div className="bg-amber-900/30 border border-amber-700/50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5" />
                  <div>
                    <div className="text-amber-400 font-medium mb-1">Tip</div>
                    <p className="text-amber-200 text-sm">{currentQuestion.tips}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-slate-300 font-medium">Your Answer</label>
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here. Be thorough and provide specific examples..."
                className="min-h-48 bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500"
              />
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  {currentAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
                <span className="text-slate-500">
                  Aim for 50-150 words for comprehensive answers
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-700 pt-4">
            <div className="text-slate-400 text-sm">
              Take your time to formulate a thoughtful response
            </div>
            <Button
              onClick={handleSubmitAnswer}
              disabled={!currentAnswer.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
            >
              {isLastQuestion ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Complete Interview
                </>
              ) : (
                <>
                  Next Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}