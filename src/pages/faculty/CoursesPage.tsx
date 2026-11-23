import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Plus, Users, Layers, ExternalLink } from 'lucide-react';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';

interface CourseItem {
  id: string;
  code: string;
  title: string;
  description: string;
  students: number;
  outcomes: number;
  isPublished: boolean;
  focus: BloomLevel[];
}

export const CoursesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<CourseItem[]>([
    {
      id: 'c1',
      code: 'CS-301',
      title: 'Data Structures and Algorithms',
      description: 'Fundamental linear and non-linear data structures, asymptotic notation, and graph algorithms.',
      students: 48,
      outcomes: 5,
      isPublished: true,
      focus: ['apply', 'analyze'],
    },
    {
      id: 'c2',
      code: 'CS-402',
      title: 'Database Management Systems',
      description: 'Relational data models, normalization, SQL, indexing, and transaction management.',
      students: 52,
      outcomes: 6,
      isPublished: true,
      focus: ['understand', 'apply', 'evaluate'],
    },
    {
      id: 'c3',
      code: 'AI-501',
      title: 'Foundations of Artificial Intelligence',
      description: 'Search algorithms, probabilistic reasoning, knowledge representation, and machine learning basics.',
      students: 42,
      outcomes: 4,
      isPublished: true,
      focus: ['analyze', 'create'],
    },
  ]);

  const [form, setForm] = useState({ code: '', title: '', description: '' });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.title) return;
    const newCourse: CourseItem = {
      id: 'c_' + Date.now(),
      code: form.code,
      title: form.title,
      description: form.description || 'New course description.',
      students: 0,
      outcomes: 0,
      isPublished: true,
      focus: ['remember', 'understand'],
    };
    setCourses([...courses, newCourse]);
    setForm({ code: '', title: '', description: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Management"
        description="Design course curriculum, structure units, and define learning outcome mappings."
        actions={
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            New Course
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {course.code}
                  </span>
                  <Badge variant={course.isPublished ? 'success' : 'default'} size="sm">
                    {course.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-base">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-3 pb-2 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {course.students} Enrolled
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    {course.outcomes} Outcomes
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Bloom's Levels:</span>
                  <div className="flex flex-wrap gap-1">
                    {course.focus.map((f) => (
                      <Badge key={f} variant={f} size="sm">
                        {BLOOM_LEVELS[f].label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>
            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Faculty Managed</span>
              <Button size="sm" variant="outline" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                Manage Course
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Course"
        description="Add a new academic course. You will be able to add units, materials, and Bloom-mapped outcomes next."
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <Input
            label="Course Code"
            placeholder="e.g. CS-301 or MATH-204"
            required
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <Input
            label="Course Title"
            placeholder="e.g. Advanced Operating Systems"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Course Description</label>
            <textarea
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              rows={3}
              placeholder="Provide a concise syllabus summary..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
