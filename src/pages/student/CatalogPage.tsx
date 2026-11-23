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
      faculty: 'Dr. Elena Vance',
      description: 'Master trees, heaps, graphs, hashing, and asymptotic analysis through Bloom-mapped evaluations.',
      unitsCount: 5,
      bloomsFocus: ['apply', 'analyze'] as const,
    },
    {
      id: 'c2',
      code: 'CS-402',
      title: 'Database Management Systems',
      faculty: 'Prof. Marcus Vance',
      description: 'Relational data models, normalization, transaction ACID properties, and query optimization.',
      unitsCount: 4,
      bloomsFocus: ['understand', 'apply', 'evaluate'] as const,
    },
    {
      id: 'c3',
      code: 'AI-501',
      title: 'Foundations of Artificial Intelligence',
      faculty: 'Dr. Elena Vance',
      description: 'Heuristic search, constraint satisfaction, probabilistic reasoning, and cognitive AI.',
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
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
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
            <Card key={course.id} className="flex flex-col justify-between hover:border-cyan-400/40 transition-all">
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                      {course.code}
                    </span>
                    {isEnrolled && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <Check className="w-3 h-3" /> Enrolled
                      </span>
                    )}
                  </div>
                  <CardTitle className="mt-2 text-base text-white">{course.title}</CardTitle>
                  <p className="text-xs text-slate-400 font-medium">Instructor: {course.faculty}</p>
                </CardHeader>
                <CardContent className="pt-2 pb-3 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>
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

              <div className="p-4 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-slate-400">{course.unitsCount} Units of Study</span>
                <Button
                  size="sm"
                  variant={isEnrolled ? 'outline' : 'teal'}
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
