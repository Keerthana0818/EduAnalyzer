import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  Activity, 
  Award, 
  Sparkles, 
  AlertTriangle
} from 'lucide-react';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import { useNavigate } from 'react-router-dom';

export const StudentAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  const cognitiveMastery = [
    { level: 'remember', score: 92, label: 'Remember (Factual Recall)', status: 'Mastered' },
    { level: 'understand', score: 84, label: 'Understand (Concept Explanation)', status: 'Proficient' },
    { level: 'apply', score: 88, label: 'Apply (Algorithm Implementation)', status: 'Mastered' },
    { level: 'analyze', score: 58, label: 'Analyze (Trade-off & Invariants)', status: 'Needs Support' },
    { level: 'evaluate', score: 64, label: 'Evaluate (Design Critiques)', status: 'Developing' },
    { level: 'create', score: 50, label: 'Create (Novel Synthesis)', status: 'Developing' },
  ] as const;

  const topicScores = [
    { topic: 'Big-O & Asymptotic Bounds', score: 95 },
    { topic: 'Binary Search Trees & Traversal', score: 90 },
    { topic: 'AVL Tree Balancing & Rotations', score: 62 },
    { topic: 'Dijkstra Shortest Path', score: 80 },
    { topic: 'Bellman-Ford & Negative Cycles', score: 55 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Cognitive Analytics"
        description="Multi-dimensional analysis of your learning ability measured through Bloom's Taxonomy and deterministic quiz outcomes."
        actions={
          <Button 
            variant="teal"
            leftIcon={<Sparkles className="w-4 h-4 text-slate-950" />}
            onClick={() => navigate('/student/recommendations')}
          >
            Personalized Action Plan
          </Button>
        }
      />

      {/* High-Level Mastery Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-emerald-950/20 border-emerald-500/30">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Top Cognitive Strength</span>
              <h3 className="text-xl font-bold text-white mt-1">Remember & Apply</h3>
              <p className="text-xs text-slate-300 mt-0.5">Average 90% accuracy in algorithm execution</p>
            </div>
            <Award className="w-8 h-8 text-emerald-400" />
          </CardContent>
        </Card>

        <Card className="bg-amber-950/20 border-amber-500/30">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Primary Growth Area</span>
              <h3 className="text-xl font-bold text-white mt-1">Analyze (58%)</h3>
              <p className="text-xs text-slate-300 mt-0.5">Struggling with multi-step rotation invariants</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </CardContent>
        </Card>

        <Card className="bg-cyan-950/20 border-cyan-500/30">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Overall Cognitive Index</span>
              <h3 className="text-xl font-bold text-white mt-1">74.2 / 100</h3>
              <p className="text-xs text-slate-300 mt-0.5">Calculated across deterministic assessments</p>
            </div>
            <Activity className="w-8 h-8 text-cyan-400" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloom's Taxonomy Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Bloom's Taxonomy Cognitive Breakdown</CardTitle>
            <CardDescription>Performance across the 6 hierarchical cognitive domains</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cognitiveMastery.map((item) => (
              <div key={item.level} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.level} size="sm">
                      {BLOOM_LEVELS[item.level].label}
                    </Badge>
                    <span className="font-semibold text-slate-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">{item.status}</span>
                    <span className="font-bold text-teal-300">{item.score}%</span>
                  </div>
                </div>
                <ProgressBar value={item.score} variant={item.level} size="md" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Topic-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Topic-Wise Performance</CardTitle>
            <CardDescription>Calculated from questions tagged by curriculum topic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topicScores.map((t, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{t.topic}</span>
                  <span className="font-bold text-teal-300">{t.score}%</span>
                </div>
                <ProgressBar 
                  value={t.score} 
                  variant={t.score >= 80 ? 'teal' : t.score >= 60 ? 'warning' : 'coral'} 
                  size="sm" 
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
