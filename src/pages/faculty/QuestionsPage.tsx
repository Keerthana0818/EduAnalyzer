import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Select } from '../../components/common/Select';
import { Input } from '../../components/common/Input';
import { 
  Sparkles, 
  Plus, 
  Check, 
  X, 
  Edit3
} from 'lucide-react';
import { ORDERED_BLOOM_LEVELS, BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';

export const QuestionsPage: React.FC = () => {
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [filterBloom, setFilterBloom] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      text: 'Which asymptotic notation provides a tight bound on the running time of an algorithm?',
      type: 'mcq',
      bloomLevel: 'remember' as BloomLevel,
      difficulty: 'easy',
      marks: 2,
      topic: 'Asymptotic Analysis',
      options: [
        { id: 'A', text: 'Big-O (O)' },
        { id: 'B', text: 'Big-Omega (Ω)' },
        { id: 'C', text: 'Big-Theta (Θ)' },
        { id: 'D', text: 'Little-o (o)' },
      ],
      correctAnswer: 'C',
      explanation: 'Big-Theta (Θ) defines both upper and lower bounds, giving a tight bound on complexity.',
      isAiGenerated: true,
      isApproved: true,
    },
    {
      id: 'q2',
      text: 'Given an AVL tree where a right-heavy node has a left-heavy right child, what rotation sequence is required to restore balance?',
      type: 'mcq',
      bloomLevel: 'apply' as BloomLevel,
      difficulty: 'medium',
      marks: 4,
      topic: 'AVL Trees',
      options: [
        { id: 'A', text: 'Single Left Rotation' },
        { id: 'B', text: 'Single Right Rotation' },
        { id: 'C', text: 'Right-Left (RL) Double Rotation' },
        { id: 'D', text: 'Left-Right (LR) Double Rotation' },
      ],
      correctAnswer: 'C',
      explanation: 'A Right-Left (RL) rotation first rotates the right child to the right, then the unbalanced node to the left.',
      isAiGenerated: true,
      isApproved: true,
    },
    {
      id: 'q3',
      text: 'Analyze why Dijkstra’s algorithm fails on graphs with negative edge cycles, while Bellman-Ford succeeds.',
      type: 'mcq',
      bloomLevel: 'analyze' as BloomLevel,
      difficulty: 'hard',
      marks: 5,
      topic: 'Graph Algorithms',
      options: [
        { id: 'A', text: 'Dijkstra assumes optimal subpaths can never be decreased once marked visited (greedy invariant).' },
        { id: 'B', text: 'Bellman-Ford only checks source adjacent edges.' },
        { id: 'C', text: 'Dijkstra requires directed acyclic graphs.' },
        { id: 'D', text: 'Negative weights invert adjacency matrices.' },
      ],
      correctAnswer: 'A',
      explanation: 'Dijkstra greedily marks nodes finalized; a negative weight later could invalidate already finalized shortest distances.',
      isAiGenerated: true,
      isApproved: true,
    },
  ]);

  const handleSimulateAiGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = {
        id: 'q_' + Date.now(),
        text: 'Evaluate whether an Adjacency Matrix or Adjacency List is superior when computing BFS on a sparse graph with V=100,000 and E=200,000.',
        type: 'mcq',
        bloomLevel: 'evaluate' as BloomLevel,
        difficulty: 'medium',
        marks: 5,
        topic: 'Graph Representations',
        options: [
          { id: 'A', text: 'Adjacency Matrix: O(1) edge lookup outweighs space penalty.' },
          { id: 'B', text: 'Adjacency List: Space O(V+E) and BFS time O(V+E) far outperform Matrix space O(V²) and time O(V²).' },
          { id: 'C', text: 'Both have equivalent performance on sparse graphs.' },
          { id: 'D', text: 'Matrix requires less cache misses during pointer chasing.' },
        ],
        correctAnswer: 'B',
        explanation: 'For sparse graphs with 100k vertices, a matrix requires 10 billion entries (~10GB RAM), whereas list needs only ~1.2MB and scans only existing edges.',
        isAiGenerated: true,
        isApproved: false,
      };
      setQuestions([generated, ...questions]);
      setIsGenerating(false);
      setIsGenModalOpen(false);
    }, 1200);
  };

  const filteredQuestions = filterBloom === 'all' 
    ? questions 
    : questions.filter(q => q.bloomLevel === filterBloom);

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Question Bank"
        description="Generate, review, and curate assessment questions mapped to Bloom's Taxonomy cognitive levels and course units."
        actions={
          <div className="flex gap-2.5">
            <Button variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
              Manual Question
            </Button>
            <Button 
              leftIcon={<Sparkles className="w-4 h-4 text-white" />} 
              onClick={() => setIsGenModalOpen(true)}
            >
              Generate with Gemini AI
            </Button>
          </div>
        }
      />

      {/* Filter Tabs by Bloom's Level */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterBloom('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterBloom === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
        >
          All Levels ({questions.length})
        </button>
        {ORDERED_BLOOM_LEVELS.map((lvl) => {
          const count = questions.filter((q) => q.bloomLevel === lvl).length;
          return (
            <button
              key={lvl}
              onClick={() => setFilterBloom(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${filterBloom === lvl ? 'bg-brand-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >
              <span>{BLOOM_LEVELS[lvl].label}</span>
              <span className="text-[10px] opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <Card key={q.id} className={!q.isApproved ? 'border-amber-300 ring-2 ring-amber-100' : ''}>
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={q.bloomLevel} size="sm">
                    {BLOOM_LEVELS[q.bloomLevel].label}
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">Topic: {q.topic}</span>
                  <Badge variant="outline" size="sm" className="capitalize">{q.difficulty}</Badge>
                  <span className="text-xs font-semibold text-slate-700">{q.marks} Marks</span>
                  {q.isAiGenerated && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      <Sparkles className="w-3 h-3" /> Gemini AI
                    </span>
                  )}
                  {!q.isApproved && (
                    <Badge variant="warning" size="sm">Pending Approval</Badge>
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 mt-2">{q.text}</h4>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!q.isApproved ? (
                  <>
                    <Button 
                      size="sm" 
                      variant="success" 
                      leftIcon={<Check className="w-3.5 h-3.5" />}
                      onClick={() => setQuestions(questions.map(x => x.id === q.id ? { ...x, isApproved: true } : x))}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger" 
                      leftIcon={<X className="w-3.5 h-3.5" />}
                      onClick={() => setQuestions(questions.filter(x => x.id !== q.id))}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="ghost">
                    <Edit3 className="w-4 h-4 text-slate-400" />
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-2 space-y-3">
              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isCorrect = opt.id === q.correctAnswer;
                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${isCorrect ? 'bg-emerald-50/80 border-emerald-300 font-semibold text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Rationale */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Answer Key & Explanation: </span>
                {q.explanation}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Question Generation Modal */}
      <Modal
        isOpen={isGenModalOpen}
        onClose={() => setIsGenModalOpen(false)}
        title="Generate Questions with Google Gemini AI"
        description="Select learning outcomes and cognitive levels. Questions are produced with structured JSON answer keys and cognitive explanations."
      >
        <div className="space-y-4">
          <Select
            label="Target Course & Unit"
            options={[
              { value: 'u1', label: 'CS-301 • Unit 1: Algorithm Analysis' },
              { value: 'u2', label: 'CS-301 • Unit 2: Trees & Heaps' },
              { value: 'u3', label: 'CS-301 • Unit 3: Graph Algorithms' },
            ]}
          />
          <Select
            label="Bloom's Taxonomy Target"
            options={ORDERED_BLOOM_LEVELS.map((lvl) => ({
              value: lvl,
              label: `${BLOOM_LEVELS[lvl].label} (${BLOOM_LEVELS[lvl].cognitiveProcesses.join(', ')})`,
            }))}
            defaultValue="apply"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Difficulty"
              options={[
                { value: 'easy', label: 'Easy (Foundational)' },
                { value: 'medium', label: 'Medium (Standard)' },
                { value: 'hard', label: 'Hard (Complex reasoning)' },
              ]}
              defaultValue="medium"
            />
            <Input label="Number of Questions" type="number" defaultValue="3" min={1} max={10} />
          </div>

          <div className="p-3 rounded-xl bg-brand-50/70 border border-brand-200 text-xs text-brand-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Faculty Review Safeguard:</span> Generated questions will be placed in your queue for review, allowing you to edit text, swap options, approve or reject before publishing to students.
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsGenModalOpen(false)}>
              Cancel
            </Button>
            <Button isLoading={isGenerating} onClick={handleSimulateAiGeneration}>
              Synthesize Questions
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
