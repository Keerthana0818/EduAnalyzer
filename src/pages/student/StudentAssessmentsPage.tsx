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
      deadline: 'Today, 4:00 PM',
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
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shadow-glow-teal" />
          Active Quizzes Available to Attempt
        </h3>

        <div className="space-y-3">
          {availableQuizzes.map((quiz) => (
            <Card key={quiz.id} className="border-teal-500/40 hover:border-teal-400 transition-all">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                      {quiz.courseCode}
                    </span>
                    <Badge variant={quiz.focusLevel} size="sm">
                      Target: {BLOOM_LEVELS[quiz.focusLevel].label}
                    </Badge>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">{quiz.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {quiz.duration} Minutes
                    </span>
                    <span>•</span>
                    <span>{quiz.marks} Total Marks</span>
                    <span>•</span>
                    <span>{quiz.questionsCount} Questions</span>
                    <span>•</span>
                    <span className="text-rose-400 font-bold">Due {quiz.deadline}</span>
                  </div>
                </div>

                <Button
                  variant="coral"
                  className="shrink-0 self-start sm:self-center"
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
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Completed Assessments & Cognitive History</h3>

        <Card>
          <CardContent className="p-0 divide-y divide-white/[0.06]">
            {pastResults.map((res) => (
              <div key={res.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                      {res.courseCode}
                    </span>
                    <span className="text-xs text-slate-500">Submitted on {res.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{res.title}</h4>
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="text-slate-400">Strongest:</span>
                    <Badge variant={res.strongestBloom} size="sm">
                      {BLOOM_LEVELS[res.strongestBloom].label}
                    </Badge>
                    <span className="text-slate-400 ml-1">Needs Focus:</span>
                    <Badge variant={res.weakestBloom} size="sm">
                      {BLOOM_LEVELS[res.weakestBloom].label}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0 self-start sm:self-center">
                  <div className="text-right">
                    <span className="text-lg font-bold text-teal-300 block">
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
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3.5 bg-rose-950/40 rounded-xl border border-rose-500/40 text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Timed Assessment:</span> Once you click "I am Ready", your timer will begin immediately. Answers auto-save in real-time.
            </div>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 leading-relaxed text-slate-300">
            <li>Assessments use deterministic server-side grading; answers are safely evaluated without AI mark modification.</li>
            <li>Questions encompass multiple cognitive tiers of Bloom's Taxonomy.</li>
            <li>Detailed topic and Bloom's level breakdown will be available as soon as results are released by the professor.</li>
          </ul>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setActiveQuizModal(null)}>
              Cancel
            </Button>
            <Button 
              variant="teal"
              onClick={() => {
                navigate('/student/dashboard');
                setActiveQuizModal(null);
              }}
            >
              I am Ready • Launch Quiz Runner
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
