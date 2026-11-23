import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Plus, Clock, Send, Eye } from 'lucide-react';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';

export const AssessmentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const assessments = [
    {
      id: 'a1',
      title: 'Midterm Assessment 1: Trees and Heaps',
      courseCode: 'CS-301',
      totalMarks: 30,
      duration: 40,
      questionsCount: 8,
      status: 'published',
      submissionsCount: 44,
      totalStudents: 48,
      avgScore: 23.4,
      bloomsProfile: ['understand', 'apply', 'analyze'] as const,
    },
    {
      id: 'a2',
      title: 'Quiz 2: Graph Traversal & Shortest Paths',
      courseCode: 'CS-301',
      totalMarks: 25,
      duration: 30,
      questionsCount: 6,
      status: 'published',
      submissionsCount: 46,
      totalStudents: 48,
      avgScore: 19.8,
      bloomsProfile: ['apply', 'analyze', 'evaluate'] as const,
    },
    {
      id: 'a3',
      title: 'Final Diagnostic Assessment: Algorithms Mastery',
      courseCode: 'CS-301',
      totalMarks: 50,
      duration: 60,
      questionsCount: 15,
      status: 'draft',
      submissionsCount: 0,
      totalStudents: 48,
      avgScore: 0,
      bloomsProfile: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'] as const,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessments Management"
        description="Assemble timed quizzes, configure deterministic grading parameters, and publish assessments to enrolled students."
        actions={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Create Assessment
          </Button>
        }
      />

      <div className="space-y-4">
        {assessments.map((a) => (
          <Card key={a.id} className="hover:border-slate-300 transition-all">
            <CardContent className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {a.courseCode}
                  </span>
                  <Badge variant={a.status === 'published' ? 'success' : 'default'} size="sm" className="capitalize">
                    {a.status}
                  </Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {a.duration} Minutes
                  </span>
                  <span className="text-xs text-slate-500">• {a.totalMarks} Total Marks</span>
                  <span className="text-xs text-slate-500">• {a.questionsCount} Questions</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{a.title}</h3>

                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">Cognitive Focus:</span>
                  {a.bloomsProfile.map((lvl) => (
                    <Badge key={lvl} variant={lvl} size="sm">
                      {BLOOM_LEVELS[lvl].label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="flex flex-wrap items-center gap-6 lg:border-l lg:border-slate-100 lg:pl-6">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Participation
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {a.submissionsCount} / {a.totalStudents} ({Math.round((a.submissionsCount / a.totalStudents) * 100)}%)
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Class Average
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {a.avgScore > 0 ? `${a.avgScore} / ${a.totalMarks}` : 'N/A (Draft)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                    Results & Heatmap
                  </Button>
                  {a.status === 'draft' ? (
                    <Button size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
                      Publish
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary">
                      Manage
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Assessment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Assessment"
        description="Set assessment duration, passing thresholds, and select questions from your Bloom-mapped question bank."
      >
        <div className="space-y-4">
          <Input label="Assessment Title" placeholder="e.g. Unit 2 Quiz: Balanced Trees" required />
          <Select
            label="Course"
            options={[
              { value: 'cs301', label: 'CS-301: Data Structures and Algorithms' },
              { value: 'cs402', label: 'CS-402: Database Management Systems' },
            ]}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Duration (Minutes)" type="number" defaultValue="30" required />
            <Input label="Passing Score (%)" type="number" defaultValue="60" required />
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            Once created, you can link questions from your AI Question Bank and release the assessment to enrolled students with deterministic auto-grading.
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Create & Assemble Questions</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
