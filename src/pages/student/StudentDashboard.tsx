import React from 'react';
import { 
  GraduationCap, 
  FileCheck2, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Bot,
  Compass
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { ORDERED_BLOOM_LEVELS, BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Enrolled Courses', value: '3', sub: 'Fall 2026', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Quizzes Completed', value: '8', sub: 'Avg 81.5% score', icon: FileCheck2, color: 'text-blue-600 bg-blue-50' },
    { title: 'Top Cognitive Level', value: 'Apply', sub: '88% accuracy', icon: Activity, color: 'text-brand-600 bg-brand-50' },
    { title: 'Active Remediation Steps', value: '2', sub: 'Targeting Analyze', icon: Sparkles, color: 'text-amber-600 bg-amber-50' },
  ];

  const activeAssessments = [
    {
      id: 'quiz-cs301-2',
      courseCode: 'CS-301',
      courseTitle: 'Data Structures and Algorithms',
      quizTitle: 'Binary Search Trees & AVL Balancing',
      duration: 30,
      marks: 25,
      deadline: 'Tomorrow, 11:59 PM',
      focusLevel: 'apply' as const,
    },
    {
      id: 'quiz-cs402-1',
      courseCode: 'CS-402',
      courseTitle: 'Database Management Systems',
      quizTitle: 'Relational Algebra & SQL Joins',
      duration: 45,
      marks: 40,
      deadline: 'In 3 days',
      focusLevel: 'analyze' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Learning Space"
        description="Track your cognitive development across Bloom's Taxonomy, complete quizzes, and follow your AI improvement roadmap."
        actions={
          <div className="flex gap-2.5">
            <Button 
              variant="outline" 
              leftIcon={<Compass className="w-4 h-4 text-emerald-600" />}
              onClick={() => navigate('/student/catalog')}
            >
              Browse Catalog
            </Button>
            <Button 
              leftIcon={<Bot className="w-4 h-4" />}
              onClick={() => navigate('/student/assistant')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Ask AI Study Tutor
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="hover:border-slate-300 transition-all">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{s.value}</h3>
                  <span className="text-[11px] text-slate-400 mt-1 inline-block">{s.sub}</span>
                </div>
                <div className={`p-3 rounded-xl ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Assessments & Courses */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Quizzes */}
          <Card className="border-emerald-200/80">
            <CardHeader className="flex flex-row items-center justify-between pb-3 bg-emerald-50/30">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <CardTitle>Open Assessments</CardTitle>
                </div>
                <CardDescription>Available quizzes waiting for your submission</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/student/assessments')}
              >
                All Quizzes
              </Button>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-slate-100">
              {activeAssessments.map((a) => (
                <div key={a.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {a.courseCode}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900">{a.quizTitle}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {a.duration} mins
                      </span>
                      <span>•</span>
                      <span>{a.marks} Marks</span>
                      <span>•</span>
                      <span className="text-amber-700 font-medium">Due {a.deadline}</span>
                    </div>
                    <div className="pt-1 flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400">Target Cognitive Level:</span>
                      <Badge variant={a.focusLevel} size="sm">
                        {BLOOM_LEVELS[a.focusLevel].label}
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 self-start sm:self-center"
                    onClick={() => navigate('/student/assessments')}
                  >
                    Start Assessment
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Personalized Improvement Plan Card */}
          <Card className="border-indigo-100 bg-gradient-to-br from-white to-brand-50/40">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-brand-700 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <CardTitle className="text-brand-950">AI Personalized Recommendation</CardTitle>
              </div>
              <CardDescription>
                Generated by Gemini based on your latest CS-301 deterministic quiz scores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3.5 bg-white rounded-xl border border-brand-200/60 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="analyze" size="sm">Analyze Level Gap</Badge>
                  <span className="text-xs font-bold text-slate-800">
                    Recursion Invariants in Tree Balance
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You scored 100% on factual recall (Remember) and syntax (Apply), but dropped marks when calculating tree height updates during multi-step AVL rotations.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs"
                    onClick={() => navigate('/student/recommendations')}
                  >
                    View Recommended Study Material
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-xs bg-brand-600 hover:bg-brand-700 text-white"
                    onClick={() => navigate('/student/recommendations')}
                  >
                    Take Adaptive Practice Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bloom's Cognitive Mastery Profile */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Bloom's Cognitive Profile</CardTitle>
              <CardDescription>Demonstrated ability based on deterministic quiz evaluations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {ORDERED_BLOOM_LEVELS.map((level) => {
                const meta = BLOOM_LEVELS[level];
                const studentMastery: Record<string, number> = {
                  remember: 92,
                  understand: 84,
                  apply: 88,
                  analyze: 58,
                  evaluate: 64,
                  create: 50,
                };
                return (
                  <div key={level} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: meta.color.hex }} 
                        />
                        <span className="font-semibold text-slate-800">{meta.label}</span>
                      </div>
                      <span className="font-semibold text-slate-700">{studentMastery[level]}%</span>
                    </div>
                    <ProgressBar
                      value={studentMastery[level]}
                      variant={level}
                      size="sm"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* AI Study Assistant Quick Help */}
          <Card className="bg-slate-900 text-white border-0 shadow-lg">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-sm">Need Help Understanding a Concept?</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The AI Study Assistant is grounded in materials uploaded by your course faculty. Ask questions and get crystal-clear explanations.
              </p>
              <Button 
                size="sm" 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                onClick={() => navigate('/student/assistant')}
              >
                Chat with Study Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
