import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { 
  Clock, 
  Play, 
  AlertCircle,
  BarChart2
} from 'lucide-react';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import { useNavigate } from 'react-router-dom';

export const StudentAssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeQuizModal, setActiveQuizModal] = useState<string | null>(null);

  const availableQuizzes = [
    {
      id: 'q-trees',
      courseCode: 'CS-301',
      title: 'AVL Trees & Balanced Search Trees Assessment',
      duration: 30,
      marks: 25,
      questionsCount: 8,
      deadline: 'Tomorrow, 11:59 PM',
      focusLevel: 'apply' as const,
      status: 'open',
    },
    {
      id: 'q-sql',
      courseCode: 'CS-402',
      title: 'SQL Normalization & BCNF Decomposition',
      duration: 40,
      marks: 35,
      questionsCount: 10,
      deadline: 'In 3 days',
      focusLevel: 'analyze' as const,
      status: 'open',
    },
  ];

  const pastResults = [
    {
      id: 'res-1',
      courseCode: 'CS-301',
      title: 'Midterm 1: Asymptotic Analysis & Recurrences',
      score: 28,
      maxScore: 30,
      percentage: 93.3,
      date: 'Nov 14, 2026',
      strongestBloom: 'remember' as const,
      weakestBloom: 'analyze' as const,
    },
    {
      id: 'res-2',
      courseCode: 'CS-301',
      title: 'Diagnostic Quiz: Graph Search Algorithms',
      score: 18,
      maxScore: 25,
      percentage: 72.0,
      date: 'Nov 19, 2026',
      strongestBloom: 'understand' as const,
      weakestBloom: 'evaluate' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Assessments & Quizzes"
        description="Attempt active quizzes under timed conditions and review detailed Bloom's Taxonomy cognitive reports upon release."
      />

      {/* Available / Open Assessments */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          Active Quizzes Available to Attempt
        </h3>

        <div className="space-y-3">
          {availableQuizzes.map((quiz) => (
            <Card key={quiz.id} className="border-emerald-200 hover:border-emerald-400 transition-all">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {quiz.courseCode}
                    </span>
                    <Badge variant={quiz.focusLevel} size="sm">
                      Target: {BLOOM_LEVELS[quiz.focusLevel].label}
                    </Badge>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{quiz.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {quiz.duration} Minutes
                    </span>
                    <span>•</span>
                    <span>{quiz.marks} Total Marks</span>
                    <span>•</span>
                    <span>{quiz.questionsCount} Questions</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">Due {quiz.deadline}</span>
                  </div>
                </div>

                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 self-start sm:self-center"
                  leftIcon={<Play className="w-4 h-4 fill-white" />}
                  onClick={() => setActiveQuizModal(quiz.id)}
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Assessments & Performance Records */}
      <div className="space-y-3 pt-4">
        <h3 className="text-sm font-bold text-slate-800">Completed Assessments & Cognitive History</h3>

        <Card>
          <CardContent className="p-0 divide-y divide-slate-100">
            {pastResults.map((res) => (
              <div key={res.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {res.courseCode}
                    </span>
                    <span className="text-xs text-slate-400">Submitted on {res.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900">{res.title}</h4>
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="text-slate-500">Strongest:</span>
                    <Badge variant={res.strongestBloom} size="sm">
                      {BLOOM_LEVELS[res.strongestBloom].label}
                    </Badge>
                    <span className="text-slate-500 ml-1">Needs Focus:</span>
                    <Badge variant={res.weakestBloom} size="sm">
                      {BLOOM_LEVELS[res.weakestBloom].label}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0 self-start sm:self-center">
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-600 block">
                      {res.score} / {res.maxScore}
                    </span>
                    <span className="text-[11px] text-slate-400">{res.percentage}% Scored</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    leftIcon={<BarChart2 className="w-3.5 h-3.5" />}
                    onClick={() => navigate('/student/analytics')}
                  >
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Start Quiz Instructions Modal */}
      <Modal
        isOpen={!!activeQuizModal}
        onClose={() => setActiveQuizModal(null)}
        title="Assessment Instructions & Anti-Cheat Notice"
        description="Please read the testing conditions carefully before beginning."
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Timed Assessment:</span> Once you click "I am Ready", your 30-minute timer will begin immediately. Answers auto-save in real-time.
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
            <li>Assessments use deterministic server-side grading; answers are safely evaluated without AI mark modification.</li>
            <li>Questions encompass multiple cognitive tiers of Bloom's Taxonomy.</li>
            <li>Detailed topic and Bloom's level breakdown will be available as soon as results are released by the professor.</li>
          </ul>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setActiveQuizModal(null)}>
              Cancel
            </Button>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => {
                alert('Quiz session simulated! When Supabase backend is wired in Phase 7, this opens the active timer test runner.');
                setActiveQuizModal(null);
              }}
            >
              I am Ready • Begin Quiz
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
