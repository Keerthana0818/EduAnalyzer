import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { 
  UploadCloud, 
  FileText, 
  FolderPlus, 
  Download, 
  Sparkles
} from 'lucide-react';

export const MaterialsPage: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('all');

  const units = [
    { id: 'u1', number: 1, title: 'Algorithm Analysis & Asymptotic Complexity', topicsCount: 3, filesCount: 4 },
    { id: 'u2', number: 2, title: 'Trees, Heaps & Priority Queues', topicsCount: 4, filesCount: 6 },
    { id: 'u3', number: 3, title: 'Graph Algorithms & Shortest Paths', topicsCount: 3, filesCount: 5 },
  ];

  const materials = [
    {
      id: 'm1',
      title: 'Lecture 03: Asymptotic Analysis & Master Theorem Notes',
      unitNumber: 1,
      unitTitle: 'Algorithm Analysis',
      topic: 'Big-O and Recurrences',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      uploadDate: 'Nov 12, 2026',
    },
    {
      id: 'm2',
      title: 'Slides: Binary Search Trees & AVL Balance Conditions',
      unitNumber: 2,
      unitTitle: 'Trees & Heaps',
      topic: 'AVL Rotations',
      fileType: 'PPTX',
      fileSize: '5.1 MB',
      uploadDate: 'Nov 18, 2026',
    },
    {
      id: 'm3',
      title: 'Lab Handout: Dijkstra & Bellman-Ford Implementation',
      unitNumber: 3,
      unitTitle: 'Graph Algorithms',
      topic: 'Shortest Paths',
      fileType: 'DOCX',
      fileSize: '1.2 MB',
      uploadDate: 'Nov 20, 2026',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Materials & Units"
        description="Organize lecture slides, notes, and lab sheets by units and topics to feed the Gemini question synthesis engine."
        actions={
          <div className="flex gap-2.5">
            <Button variant="outline" leftIcon={<FolderPlus className="w-4 h-4" />}>
              Add Unit
            </Button>
            <Button leftIcon={<UploadCloud className="w-4 h-4" />} onClick={() => setIsUploadModalOpen(true)}>
              Upload Material
            </Button>
          </div>
        }
      />

      {/* Units Carousel / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {units.map((u) => (
          <Card 
            key={u.id} 
            className={`cursor-pointer transition-all ${selectedUnit === u.id ? 'border-brand-500 ring-2 ring-brand-100' : 'hover:border-slate-300'}`}
            onClick={() => setSelectedUnit(selectedUnit === u.id ? 'all' : u.id)}
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                  Unit {u.number}
                </span>
                <span className="text-xs text-slate-400 font-medium">{u.filesCount} Files</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{u.title}</h4>
              <p className="text-xs text-slate-500">{u.topicsCount} Topics categorized</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Materials List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Uploaded Learning Materials</CardTitle>
            <CardDescription>Documents accessible by enrolled students and indexed for AI assessment generation</CardDescription>
          </div>
          {selectedUnit !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedUnit('all')}>
              Show All Units
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0 divide-y divide-slate-100">
          {materials.map((m) => (
            <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                  <FileText className="w-5 h-5 text-brand-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-900">{m.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Unit {m.unitNumber}: {m.unitTitle}</span>
                    <span>•</span>
                    <span>Topic: {m.topic}</span>
                    <span>•</span>
                    <Badge variant="outline" size="sm">{m.fileType}</Badge>
                    <span>•</span>
                    <span>{m.fileSize}</span>
                    <span>•</span>
                    <span>Uploaded {m.uploadDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <Button size="sm" variant="outline" leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-600" />}>
                  Generate Questions
                </Button>
                <Button size="sm" variant="ghost" className="p-2">
                  <Download className="w-4 h-4 text-slate-500" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upload Material Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Course Material"
        description="Supported formats: PDF, DOCX, PPTX, TXT. File will be stored securely in Supabase Storage."
      >
        <div className="space-y-4">
          <Select
            label="Target Unit"
            options={units.map((u) => ({ value: u.id, label: `Unit ${u.number}: ${u.title}` }))}
          />
          <Input label="Topic Name" placeholder="e.g. Red-Black Tree Rotations" required />
          <Input label="Document Title" placeholder="e.g. Chapter 4 Slide Deck" required />

          {/* Drag & drop upload area */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/60 hover:bg-slate-50 cursor-pointer transition-colors">
            <UploadCloud className="w-10 h-10 text-brand-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-[11px] text-slate-400 mt-1">PDF, DOCX, PPTX or TXT (Max 25MB)</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsUploadModalOpen(false)}>Upload Document</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
