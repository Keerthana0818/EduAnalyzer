import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Download, FileText } from 'lucide-react';

export const StudentCoursesPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('cs301');

  const enrolled = [
    { id: 'cs301', code: 'CS-301', title: 'Data Structures and Algorithms', faculty: 'Prof. Sarah Jenkins' },
    { id: 'cs402', code: 'CS-402', title: 'Database Management Systems', faculty: 'Dr. Marcus Vance' },
  ];

  const units = [
    {
      unitNumber: 1,
      title: 'Algorithm Analysis & Big-O Notation',
      materials: [
        { title: 'Lecture 1: Asymptotic Notation Overview', type: 'PDF', size: '2.1 MB' },
        { title: 'Recurrence Relations Cheat Sheet', type: 'PDF', size: '1.2 MB' },
      ],
    },
    {
      unitNumber: 2,
      title: 'Trees, Heaps & AVL Self-Balancing',
      materials: [
        { title: 'AVL Trees Rotation Diagrams & Pseudocode', type: 'PPTX', size: '4.8 MB' },
        { title: 'Binary Heap Priority Queue Implementation', type: 'DOCX', size: '950 KB' },
      ],
    },
    {
      unitNumber: 3,
      title: 'Graph Traversal & Shortest Path Algorithms',
      materials: [
        { title: 'Dijkstra and Bellman-Ford Visual Walkthrough', type: 'PDF', size: '3.4 MB' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Enrolled Courses"
        description="Access materials uploaded by your professors, organized by unit and topic for seamless studying."
      />

      {/* Course Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {enrolled.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourse(c.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${selectedCourse === c.id ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            <span>{c.code}</span>
            <span className="font-normal opacity-90 hidden sm:inline">• {c.title}</span>
          </button>
        ))}
      </div>

      {/* Course Unit Breakdown & Files */}
      <div className="space-y-4">
        {units.map((unit) => (
          <Card key={unit.unitNumber}>
            <CardHeader className="pb-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    U{unit.unitNumber}
                  </span>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-900">
                      Unit {unit.unitNumber}: {unit.title}
                    </CardTitle>
                    <p className="text-[11px] text-slate-500">{unit.materials.length} Materials Uploaded</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-slate-100">
              {unit.materials.map((m, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h5 className="text-xs font-semibold text-slate-800">{m.title}</h5>
                      <span className="text-[11px] text-slate-400">{m.type} • {m.size}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />}>
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
