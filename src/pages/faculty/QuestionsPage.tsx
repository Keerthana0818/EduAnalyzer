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
  X, 
  Edit3
} from 'lucide-react';
import { ORDERED_BLOOM_LEVELS, BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';
import { MockDatabase } from '../../services/mockDatabase';
import type { QuizQuestion } from '../../services/mockDatabase';

export const QuestionsPage: React.FC = () => {
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [filterBloom, setFilterBloom] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTargetBloom, setSelectedTargetBloom] = useState<BloomLevel>('apply');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const [questions, setQuestions] = useState<QuizQuestion[]>(MockDatabase.getQuestions());

  const handleSimulateAiGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated: QuizQuestion = {
        id: 'q_' + Date.now(),
        courseCode: 'CS-301',
        topic: 'Graph Shortest Paths',
        bloomLevel: selectedTargetBloom,
        difficulty: selectedDifficulty,
        marks: selectedTargetBloom === 'evaluate' || selectedTargetBloom === 'create' ? 6 : 4,
        text: `[Gemini Synthesized • ${BLOOM_LEVELS[selectedTargetBloom].label}] Evaluate why Dijkstra fails on negative cycles while Bellman-Ford can report negative cycles in O(V*E) time.`,
        options: [
          { id: 'A', text: 'Dijkstra greedily marks nodes visited without reconsidering distances when negative edges are encountered.' },
          { id: 'B', text: 'Bellman-Ford inverts the adjacency matrix.' },
          { id: 'C', text: 'Dijkstra requires acyclic undirected trees.' },
          { id: 'D', text: 'Negative weights only exist in topological sorts.' },
        ],
        correctAnswer: 'A',
        explanation: 'Dijkstra greedily locks in shortest distances once popped from the priority queue. A negative edge relaxed later would violate this invariant.',
      };

      MockDatabase.addQuestion(generated);
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
        title="AI Question Bank & Synthesis"
        description="Generate, review, and curate assessment questions mapped to Bloom's Taxonomy cognitive levels and course units."
        actions={
          <div className="flex gap-2.5">
            <Button 
              variant="teal" 
              leftIcon={<Sparkles className="w-4 h-4 text-slate-950" />} 
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
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterBloom === 'all' ? 'bg-teal-500 text-slate-950 shadow-glow-teal' : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border border-white/10'}`}
        >
          All Levels ({questions.length})
        </button>
        {ORDERED_BLOOM_LEVELS.map((lvl) => {
          const count = questions.filter((q) => q.bloomLevel === lvl).length;
          return (
            <button
              key={lvl}
              onClick={() => setFilterBloom(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${filterBloom === lvl ? 'bg-teal-500 text-slate-950 shadow-glow-teal' : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border border-white/10'}`}
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
          <Card key={q.id} className="border border-white/10 hover:border-teal-400/40 transition-all">
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={q.bloomLevel} size="sm">
                    {BLOOM_LEVELS[q.bloomLevel].label}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">Topic: {q.topic}</span>
                  <Badge variant="outline" size="sm" className="capitalize">{q.difficulty}</Badge>
                  <span className="text-xs font-bold text-teal-300">{q.marks} Marks</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
                    <Sparkles className="w-3 h-3" /> Gemini AI
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mt-2 leading-relaxed">{q.text}</h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Button 
                  size="sm" 
                  variant="outline" 
                  leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-rose-400 hover:text-rose-300 p-2"
                  onClick={() => setQuestions(questions.filter(x => x.id !== q.id))}
                >
                  <X className="w-4 h-4" />
                </Button>
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
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${isCorrect ? 'bg-teal-950/60 border-teal-400 text-teal-200 font-bold shadow-[0_0_10px_rgba(0,229,190,0.2)]' : 'bg-white/[0.02] border-white/10 text-slate-300'}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${isCorrect ? 'bg-teal-400 text-slate-950' : 'bg-white/10 text-slate-300'}`}>
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Rationale */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300">
                <span className="font-bold text-teal-300">Deterministic Answer Key: </span>
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
        title="Generate Bloom Questions with Google Gemini"
        description="Select learning outcomes and cognitive levels. Questions are produced with structured JSON answer keys and cognitive explanations."
      >
        <div className="space-y-4 text-xs">
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
            value={selectedTargetBloom}
            onChange={(e) => setSelectedTargetBloom(e.target.value as BloomLevel)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Difficulty"
              options={[
                { value: 'easy', label: 'Easy (Foundational)' },
                { value: 'medium', label: 'Medium (Standard)' },
                { value: 'hard', label: 'Hard (Complex reasoning)' },
              ]}
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            />
            <Input label="Number of Questions" type="number" defaultValue="3" min={1} max={10} />
          </div>

          <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Faculty Approval Workflow:</span> Generated questions will be placed directly in your bank, with options and explanation rationale ready for quiz publishing.
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsGenModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="teal" isLoading={isGenerating} onClick={handleSimulateAiGeneration}>
              Synthesize & Save to Bank
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
