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
import { useNavigate } from 'react-router-dom';

export const MaterialsPage: React.FC = () => {
  const navigate = useNavigate();
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
            <Button variant="teal" leftIcon={<UploadCloud className="w-4 h-4 text-slate-950" />} onClick={() => setIsUploadModalOpen(true)}>
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
            className={`cursor-pointer transition-all ${selectedUnit === u.id ? 'border-teal-400 ring-2 ring-teal-400/20' : 'hover:border-white/20'}`}
            onClick={() => setSelectedUnit(selectedUnit === u.id ? 'all' : u.id)}
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/30">
                  Unit {u.number}
                </span>
                <span className="text-xs text-slate-400 font-medium">{u.filesCount} Files</span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">{u.title}</h4>
              <p className="text-xs text-slate-400">{u.topicsCount} Topics categorized</p>
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
        <CardContent className="p-0 divide-y divide-white/[0.06]">
          {materials.map((m) => (
            <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.04] text-teal-400 shrink-0 mt-0.5 border border-white/10">
                  <FileText className="w-5 h-5 text-teal-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">{m.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">Unit {m.unitNumber}: {m.unitTitle}</span>
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-teal-400" />}
                  onClick={() => navigate('/faculty/questions')}
                >
                  Generate Questions
                </Button>
                <Button size="sm" variant="ghost" className="p-2">
                  <Download className="w-4 h-4 text-slate-400" />
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
        <div className="space-y-4 text-xs">
          <Select
            label="Target Unit"
            options={units.map((u) => ({ value: u.id, label: `Unit ${u.number}: ${u.title}` }))}
          />
          <Input label="Topic Name" placeholder="e.g. Red-Black Tree Rotations" required />
          <Input label="Document Title" placeholder="e.g. Chapter 4 Slide Deck" required />

          {/* Drag & drop upload area */}
          <div className="border-2 border-dashed border-white/15 rounded-2xl p-8 text-center bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-colors">
            <UploadCloud className="w-10 h-10 text-teal-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-200">Click to upload or drag and drop</p>
            <p className="text-[11px] text-slate-400 mt-1">PDF, DOCX, PPTX or TXT (Max 25MB)</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="teal" onClick={() => setIsUploadModalOpen(false)}>Upload Document</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
