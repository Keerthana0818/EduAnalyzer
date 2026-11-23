import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { Search, Check } from 'lucide-react';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';

export const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['c1', 'c2']);

  const catalog = [
    {
      id: 'c1',
      code: 'CS-301',
      title: 'Data Structures and Algorithms',
      faculty: 'Prof. Sarah Jenkins',
      description: 'Master trees, heaps, graphs, hashing, and asymptotic analysis through Bloom-mapped evaluations.',
      unitsCount: 5,
      bloomsFocus: ['apply', 'analyze'] as const,
    },
    {
      id: 'c2',
      code: 'CS-402',
      title: 'Database Management Systems',
      faculty: 'Dr. Marcus Vance',
      description: 'Relational data models, normalization, transaction ACID properties, and query optimization.',
      unitsCount: 4,
      bloomsFocus: ['understand', 'apply', 'evaluate'] as const,
    },
    {
      id: 'c3',
      code: 'AI-501',
      title: 'Foundations of Artificial Intelligence',
      faculty: 'Prof. Alan Turing',
      description: 'Heuristic search, constraint satisfaction, probabilistic reasoning, and intro to reinforcement learning.',
      unitsCount: 6,
      bloomsFocus: ['analyze', 'create'] as const,
    },
    {
      id: 'math-201',
      code: 'MATH-201',
      title: 'Discrete Mathematics & Graph Theory',
      faculty: 'Dr. Katherine Euler',
      description: 'Propositional logic, combinatorics, proof by induction, recurrence relations, and Eulerian paths.',
      unitsCount: 4,
      bloomsFocus: ['remember', 'understand', 'apply'] as const,
    },
  ];

  const handleToggleEnroll = (id: string) => {
    if (enrolledCourses.includes(id)) {
      setEnrolledCourses(enrolledCourses.filter((c) => c !== id));
    } else {
      setEnrolledCourses([...enrolledCourses, id]);
    }
  };

  const filtered = catalog.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Catalog"
        description="Browse academic courses, review faculty learning outcomes, and register to access lecture materials and assessments."
        actions={
          <div className="w-72">
            <Input
              placeholder="Search by code or title..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.id);
          return (
            <Card key={course.id} className="flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {course.code}
                    </span>
                    {isEnrolled && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3" /> Enrolled
                      </span>
                    )}
                  </div>
                  <CardTitle className="mt-2 text-base">{course.title}</CardTitle>
                  <p className="text-xs text-slate-500 font-medium">Instructor: {course.faculty}</p>
                </CardHeader>
                <CardContent className="pt-2 pb-3 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">{course.description}</p>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Target Bloom's Domains:</span>
                    <div className="flex flex-wrap gap-1">
                      {course.bloomsFocus.map((f) => (
                        <Badge key={f} variant={f} size="sm">
                          {BLOOM_LEVELS[f].label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{course.unitsCount} Units of Study</span>
                <Button
                  size="sm"
                  variant={isEnrolled ? 'outline' : 'primary'}
                  className={!isEnrolled ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
                  onClick={() => handleToggleEnroll(course.id)}
                >
                  {isEnrolled ? 'Unregister' : 'Register for Course'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
