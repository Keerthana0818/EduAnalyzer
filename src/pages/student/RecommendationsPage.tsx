import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText
} from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const actionSteps = [
    {
      step: 1,
      title: 'Review AVL Rotation Invariant Slides',
      description: 'Study Slides 14-22 of "Unit 2: Balanced Search Trees" focusing on how node heights are recalculated.',
      estMinutes: 15,
      completed: true,
      materialLink: 'Slides: Binary Search Trees & AVL Balance Conditions',
    },
    {
      step: 2,
      title: 'Complete Visual Double Rotation Walkthrough',
      description: 'Step through an RL rotation manually on paper with a 4-node subtree before inspecting code.',
      estMinutes: 20,
      completed: false,
      materialLink: null,
    },
    {
      step: 3,
      title: 'Attempt 3 Targeted Adaptive Practice Questions',
      description: 'High-focus questions generated at the Analyze Bloom tier to solidify your subtree balancing intuition.',
      estMinutes: 15,
      completed: false,
      materialLink: null,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Personalized AI Learning Plan"
        description="Targeted cognitive remediation plans synthesized by Google Gemini AI based on your deterministic quiz results."
        badge={
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/40 shadow-glow-teal">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" /> AI Recommended Roadmap
          </span>
        }
      />

      {/* Primary Learning Gap Card */}
      <Card className="border-teal-500/30 bg-gradient-to-r from-teal-950/20 via-[#0D1526] to-[#0D1526]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="analyze" size="md">Analyze Tier Gap</Badge>
              <span className="text-xs font-semibold text-slate-400">CS-301 • Unit 2</span>
            </div>
            <span className="text-xs text-teal-300 font-bold">Goal: Reach 80% Mastery</span>
          </div>
          <CardTitle className="text-base sm:text-lg mt-2 text-white">
            Remediation: AVL Tree Rotations & Invariant Analysis
          </CardTitle>
          <CardDescription className="text-slate-300 text-xs sm:text-sm">
            Deterministic evaluation from Quiz 2 showed that you have 100% recall of AVL definitions (Remember), but had a 42% accuracy drop when deducing the sequence of child pointer swaps in Double Rotations (Analyze).
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Step-by-Step Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Prescribed Step-by-Step Action Plan</CardTitle>
          <CardDescription>Follow these tailored steps to bridge your cognitive gap</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionSteps.map((step) => (
            <div
              key={step.step}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${step.completed ? 'bg-white/[0.02] border-white/10 opacity-70' : 'bg-white/[0.04] border-teal-500/30 shadow-glow-teal'}`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${step.completed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'}`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : step.step}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <span className="text-[11px] text-teal-400 font-medium">({step.estMinutes} mins)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                  {step.materialLink && (
                    <div className="pt-1 flex items-center gap-1 text-[11px] font-semibold text-teal-400 hover:text-teal-300 cursor-pointer">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{step.materialLink}</span>
                    </div>
                  )}
                </div>
              </div>

              {!step.completed ? (
                <Button 
                  size="sm" 
                  variant="teal"
                  className="shrink-0 self-start sm:self-center"
                  onClick={() => setIsQuizModalOpen(true)}
                >
                  Start Activity
                </Button>
              ) : (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 self-start sm:self-center">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Adaptive Practice Quiz Modal */}
      <Modal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Adaptive Practice Problem"
        description="Bloom's Level: Analyze • Target Concept: Right-Left Double Rotations"
      >
        <div className="space-y-4 text-xs text-slate-200">
          <p className="font-semibold text-white text-sm">
            A node X has balance factor -2 (right-heavy). Its right child Y has balance factor +1 (left-heavy). Which node becomes the new root of this subtree after complete rebalancing?
          </p>
          <div className="space-y-2">
            {[
              { id: 'A', text: 'Node X' },
              { id: 'B', text: 'Node Y' },
              { id: 'C', text: 'The left child of Node Y (Node Z)' },
              { id: 'D', text: 'The parent of Node X' },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
              >
                <input type="radio" name="practice_opt" className="text-teal-400" />
                <span className="font-bold text-teal-300">{opt.id}.</span>
                <span className="text-slate-200">{opt.text}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" onClick={() => setIsQuizModalOpen(false)}>
              Close
            </Button>
            <Button 
              variant="teal"
              onClick={() => {
                alert('Correct! In an RL rotation, the grandchild (left child of Y) rotates up to become the new root of the subtree.');
                setIsQuizModalOpen(false);
              }}
            >
              Check Answer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
