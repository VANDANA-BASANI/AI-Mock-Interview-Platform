import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Play, Target, Briefcase } from 'lucide-react';
import { roles, companies } from '../data/questions';

interface SetupFormProps {
  onStart: (role: string, company: string, difficulty: 'easy' | 'medium' | 'hard', questionCount: number) => void;
}

export function SetupForm({ onStart }: SetupFormProps) {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role && company) {
      onStart(role, company, difficulty, questionCount);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Mock Interview Platform</h1>
          <p className="text-slate-600 text-lg">Practice makes perfect. Ace your next interview with AI-powered feedback.</p>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Interview Configuration
            </CardTitle>
            <CardDescription className="text-slate-300">
              Customize your practice session
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-700 font-medium">Target Role</Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger className="bg-white border-slate-300">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-700 font-medium">Target Company</Label>
                  <Select value={company} onValueChange={setCompany} required>
                    <SelectTrigger className="bg-white border-slate-300">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {companies.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Difficulty Level</Label>
                <RadioGroup 
                  value={difficulty} 
                  onValueChange={(v) => setDifficulty(v as 'easy' | 'medium' | 'hard')}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="easy" id="easy" className="peer sr-only" />
                    <label
                      htmlFor="easy"
                      className="flex flex-col items-center p-4 bg-white border-2 border-slate-200 rounded-xl cursor-pointer peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all hover:border-emerald-300"
                    >
                      <span className="text-2xl mb-1">🌱</span>
                      <span className="font-medium text-slate-700">Easy</span>
                      <span className="text-xs text-slate-500">Beginner friendly</span>
                    </label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                    <label
                      htmlFor="medium"
                      className="flex flex-col items-center p-4 bg-white border-2 border-slate-200 rounded-xl cursor-pointer peer-checked:border-amber-500 peer-checked:bg-amber-50 transition-all hover:border-amber-300"
                    >
                      <span className="text-2xl mb-1">⚡</span>
                      <span className="font-medium text-slate-700">Medium</span>
                      <span className="text-xs text-slate-500">Intermediate</span>
                    </label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="hard" id="hard" className="peer sr-only" />
                    <label
                      htmlFor="hard"
                      className="flex flex-col items-center p-4 bg-white border-2 border-slate-200 rounded-xl cursor-pointer peer-checked:border-rose-500 peer-checked:bg-rose-50 transition-all hover:border-rose-300"
                    >
                      <span className="text-2xl mb-1">🔥</span>
                      <span className="font-medium text-slate-700">Hard</span>
                      <span className="text-xs text-slate-500">Expert level</span>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="count" className="text-slate-700 font-medium">Number of Questions</Label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    id="count"
                    min="3"
                    max="10"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-lg min-w-[3rem] text-center">
                    {questionCount}
                  </span>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={!role || !company}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Interview Session
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-indigo-600">500+</div>
            <div className="text-sm text-slate-600">Questions</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-emerald-600">AI</div>
            <div className="text-sm text-slate-600">Powered Feedback</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-amber-600">24/7</div>
            <div className="text-sm text-slate-600">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}