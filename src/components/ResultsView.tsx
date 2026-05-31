import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Star, TrendingUp, AlertCircle, RotateCcw, Home } from 'lucide-react';
import { InterviewSession as ISession, Answer } from '../types';
import { calculateOverallScore } from '../utils/helpers';

interface ResultsViewProps {
  session: ISession;
  answers: Answer[];
  onRestart: () => void;
  onHome: () => void;
}

export function ResultsView({ session, answers, onRestart, onHome }: ResultsViewProps) {
  const overallScore = calculateOverallScore(answers);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent work! You\'re well-prepared for your interview.';
    if (score >= 60) return 'Good effort! Keep practicing to improve your responses.';
    return 'Keep practicing! Focus on providing more detailed answers.';
  };

  const averageWordCount = Math.round(
    answers.reduce((sum, a) => sum + a.content.trim().split(/\s+/).filter(Boolean).length, 0) / answers.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Interview Complete!</h1>
          <p className="text-slate-600">Here's your performance summary</p>
        </div>

        {/* Score Card */}
        <Card className="mb-6 border-slate-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-slate-500 mb-1">Overall Score</div>
                <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}%
                </div>
                <div className="text-slate-600 mt-2">{getScoreMessage(overallScore)}</div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{answers.length}</div>
                  <div className="text-sm text-slate-500">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{averageWordCount}</div>
                  <div className="text-sm text-slate-500">Avg Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{session.role.split(' ')[0]}</div>
                  <div className="text-sm text-slate-500">Role</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Question-by-Question Feedback</h2>
          
          {answers.map((answer, index) => {
            const question = session.questions.find(q => q.id === answer.questionId);
            if (!question) return null;

            return (
              <Card key={answer.questionId} className="border-slate-200 overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 text-indigo-700 font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-slate-900 text-lg">
                          {question.question}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            question.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                            question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {question.difficulty}
                          </span>
                          <span className="text-slate-500 capitalize">{question.category}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= (answer.rating || 0)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <div className="text-sm font-medium text-slate-700 mb-2">Your Answer</div>
                    <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">
                      {answer.content}
                    </p>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-indigo-900 mb-1">AI Feedback</div>
                        <p className="text-indigo-700">{answer.feedback}</p>
                      </div>
                    </div>
                  </div>

                  {answer.keywords && answer.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {answer.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Improvement Tips */}
        <Card className="mt-6 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-900 mb-2">Tips for Improvement</div>
                <ul className="space-y-2 text-amber-800">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 text-amber-600" />
                    <span>Use the STAR method for behavioral questions (Situation, Task, Action, Result)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 text-amber-600" />
                    <span>Include specific metrics and outcomes when describing achievements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 text-amber-600" />
                    <span>Practice explaining technical concepts in simple terms</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={onHome}
            variant="outline"
            className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={onRestart}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
}