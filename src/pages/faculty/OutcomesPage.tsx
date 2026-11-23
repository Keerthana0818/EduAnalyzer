import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Plus } from 'lucide-react';
import { ORDERED_BLOOM_LEVELS, BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';

export const OutcomesPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('cs301');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [outcomes, setOutcomes] = useState([
    {
      id: 'clo1',
      code: 'CLO-1',
      description: 'Define and state time and space complexities using Big-O, Big-Omega, and Big-Theta notations.',
      bloomLevel: 'remember' as BloomLevel,
      targetScore: 75,
      questionsCount: 14,
    },
    {
      id: 'clo2',
      code: 'CLO-2',
      description: 'Explain the internal mechanics of balanced tree structures (AVL, Red-Black) and hash table collision resolution.',
      bloomLevel: 'understand' as BloomLevel,
      targetScore: 70,
      questionsCount: 18,
    },
    {
      id: 'clo3',
      code: 'CLO-3',
      description: 'Implement shortest path and minimum spanning tree algorithms on weighted directed graphs.',
      bloomLevel: 'apply' as BloomLevel,
      targetScore: 65,
      questionsCount: 22,
    },
    {
      id: 'clo4',
      code: 'CLO-4',
      description: 'Analyze algorithmic trade-offs between dynamic programming and greedy strategies for optimization problems.',
      bloomLevel: 'analyze' as BloomLevel,
      targetScore: 60,
      questionsCount: 16,
    },
  ]);

  const [form, setForm] = useState({
    code: '',
    description: '',
    bloomLevel: 'apply' as BloomLevel,
    targetScore: '70',
  });

  const handleAddOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.description) return;
    setOutcomes([
      ...outcomes,
      {
        id: 'clo_' + Date.now(),
        code: form.code,
        description: form.description,
        bloomLevel: form.bloomLevel,
        targetScore: parseInt(form.targetScore) || 70,
        questionsCount: 0,
      },
    ]);
    setForm({ code: '', description: '', bloomLevel: 'apply', targetScore: '70' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Learning Outcomes (CLOs)"
        description="Map learning outcomes to the 6 levels of Bloom's Taxonomy to guide question generation and student evaluation."
        actions={
          <div className="flex items-center gap-3">
            <Select
              options={[
                { value: 'cs301', label: 'CS-301: Data Structures and Algorithms' },
                { value: 'cs402', label: 'CS-402: Database Management Systems' },
                { value: 'ai501', label: 'AI-501: Artificial Intelligence' },
              ]}
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-72"
            />
            <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
              Add Outcome
            </Button>
          </div>
        }
      />

      {/* Bloom's Mapping Visual Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ORDERED_BLOOM_LEVELS.map((lvl) => {
          const meta = BLOOM_LEVELS[lvl];
          const count = outcomes.filter((o) => o.bloomLevel === lvl).length;
          return (
            <Card key={lvl} className="text-center p-3 border-t-4" style={{ borderTopColor: meta.color.hex }}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                {meta.label}
              </span>
              <span className="text-xl font-extrabold text-slate-900 mt-0.5 block">{count}</span>
              <span className="text-[10px] text-slate-400">Outcomes Defined</span>
            </Card>
          );
        })}
      </div>

      {/* Outcomes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Defined Course Outcomes</CardTitle>
          <CardDescription>Each outcome directs assessment generation and cognitive gap detection</CardDescription>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-slate-100">
          {outcomes.map((item) => (
            <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.code}
                  </span>
                  <Badge variant={item.bloomLevel} size="sm">
                    {BLOOM_LEVELS[item.bloomLevel].label}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">
                    Target: {item.targetScore}%
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-snug">{item.description}</p>
                <div className="text-[11px] text-slate-400">
                  Associated Verbs: {BLOOM_LEVELS[item.bloomLevel].actionVerbs.slice(0, 4).join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  {item.questionsCount} Questions tagged
                </span>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Outcome Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Learning Outcome"
        description="Associate an outcome with a specific cognitive domain from Bloom's Revised Taxonomy."
      >
        <form onSubmit={handleAddOutcome} className="space-y-4">
          <Input
            label="Outcome Code"
            placeholder="e.g. CLO-5"
            required
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <Select
            label="Bloom's Taxonomy Level"
            options={ORDERED_BLOOM_LEVELS.map((lvl) => ({
              value: lvl,
              label: `${BLOOM_LEVELS[lvl].order}. ${BLOOM_LEVELS[lvl].label} - ${BLOOM_LEVELS[lvl].description.slice(0, 45)}...`,
            }))}
            value={form.bloomLevel}
            onChange={(e) => setForm({ ...form, bloomLevel: e.target.value as BloomLevel })}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Outcome Statement</label>
            <textarea
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              rows={3}
              placeholder="Students should be able to..."
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <Input
            label="Target Mastery Score (%)"
            type="number"
            min={1}
            max={100}
            value={form.targetScore}
            onChange={(e) => setForm({ ...form, targetScore: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Outcome</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
