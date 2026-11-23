import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { AlertTriangle, Download, Sparkles } from 'lucide-react';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';

export const AnalyticsPage: React.FC = () => {
  const bloomStats = [
    { level: 'remember', avg: 86 },
    { level: 'understand', avg: 79 },
    { level: 'apply', avg: 72 },
    { level: 'analyze', avg: 59 },
    { level: 'evaluate', avg: 54 },
    { level: 'create', avg: 47 },
  ] as const;

  const strugglingStudents = [
    { name: 'Jordan Miller', email: 'jordan.m@university.edu', score: '52%', weakBloom: 'analyze' as const, recommendationSent: true },
    { name: 'Elena Rostova', email: 'elena.r@university.edu', score: '56%', weakBloom: 'evaluate' as const, recommendationSent: true },
    { name: 'David Chen', email: 'david.c@university.edu', score: '58%', weakBloom: 'apply' as const, recommendationSent: false },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class Cognitive Analytics"
        description="Comprehensive cognitive performance heatmaps across all 6 levels of Bloom's Taxonomy and learning gap detection."
        actions={
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Export CSV Report
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Class-Wide Bloom's Taxonomy Mastery</CardTitle>
            <CardDescription>Average percentage achieved across all graded questions by cognitive tier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bloomStats.map((item) => {
              const meta = BLOOM_LEVELS[item.level];
              return (
                <div key={item.level} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.level} size="sm">
                        {meta.label}
                      </Badge>
                      <span className="text-slate-400 hidden sm:inline text-[11px] truncate max-w-[200px]">
                        {meta.description.slice(0, 38)}...
                      </span>
                    </div>
                    <span className="font-bold text-teal-300">{item.avg}% Class Average</span>
                  </div>
                  <ProgressBar value={item.avg} variant={item.level} size="md" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Common Learning Gaps */}
        <Card className="border-amber-500/30 bg-amber-950/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <CardTitle className="text-amber-200">Detected Class Learning Gaps</CardTitle>
            </div>
            <CardDescription className="text-amber-300/80">
              Aggregated from deterministic assessments identifying topics where more than 35% of students missed points
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3.5 bg-black/40 rounded-xl border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">1. AVL Multi-Rotations (Analyze)</span>
                <span className="text-xs font-bold text-rose-400">41% Error Rate</span>
              </div>
              <p className="text-xs text-slate-300">
                Students correctly identify unbalanced nodes, but fail to re-calculate parent balance factors after Double Left-Right rotations.
              </p>
            </div>

            <div className="p-3.5 bg-black/40 rounded-xl border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">2. Dynamic Programming Optimal Substructure (Evaluate)</span>
                <span className="text-xs font-bold text-rose-400">46% Error Rate</span>
              </div>
              <p className="text-xs text-slate-300">
                Difficulty validating whether subproblems are independent when comparing Memoization vs Tabulation space requirements.
              </p>
            </div>

            <Button 
              size="sm" 
              variant="coral"
              className="w-full mt-2"
              leftIcon={<Sparkles className="w-4 h-4 text-white" />}
            >
              Generate AI Remedial Quiz for Entire Class
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Students Requiring Additional Guidance */}
      <Card>
        <CardHeader>
          <CardTitle>Students Benefiting from Extra Support</CardTitle>
          <CardDescription>Students with performance under the 60% threshold flagged for personalized AI study plans</CardDescription>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-white/[0.06]">
          {strugglingStudents.map((s, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02]">
              <div>
                <h4 className="text-sm font-bold text-white">{s.name}</h4>
                <p className="text-xs text-slate-400">{s.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-400">Overall: {s.score}</span>
                  <span className="text-xs text-slate-400">• Primary Drop-off:</span>
                  <Badge variant={s.weakBloom} size="sm">
                    {BLOOM_LEVELS[s.weakBloom].label}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {s.recommendationSent ? (
                  <span className="text-xs text-teal-300 font-bold px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30">
                    AI Plan Active
                  </span>
                ) : (
                  <Button size="sm" variant="teal">Send AI Remediation Plan</Button>
                )}
                <Button size="sm" variant="outline">
                  Inspect Report
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
