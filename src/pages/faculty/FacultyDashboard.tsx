import React from 'react';
import { 
  BookOpen, 
  Users, 
  HelpCircle, 
  Sparkles, 
  Plus, 
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { ORDERED_BLOOM_LEVELS, BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import { useNavigate } from 'react-router-dom';

export const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Active Courses', value: '4', change: '+1 this term', icon: BookOpen, color: 'text-brand-600 bg-brand-50' },
    { title: 'Enrolled Students', value: '142', change: 'Across 4 courses', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Total Questions in Bank', value: '186', change: '85% AI-generated', icon: HelpCircle, color: 'text-amber-600 bg-amber-50' },
    { title: 'Avg. Class Cognitive Mastery', value: '74.2%', change: '+5.4% improvement', icon: Sparkles, color: 'text-purple-600 bg-purple-50' },
  ];

  const recentCourses = [
    {
      id: 'cs301',
      code: 'CS-301',
      title: 'Data Structures and Algorithms',
      students: 48,
      assessments: 3,
      bloomsEmphasis: ['apply', 'analyze'] as const,
      status: 'Active',
    },
    {
      id: 'cs402',
      code: 'CS-402',
      title: 'Database Management Systems',
      students: 52,
      assessments: 4,
      bloomsEmphasis: ['understand', 'apply', 'evaluate'] as const,
      status: 'Active',
    },
    {
      id: 'ai501',
      code: 'AI-501',
      title: 'Foundations of Artificial Intelligence',
      students: 42,
      assessments: 2,
      bloomsEmphasis: ['analyze', 'create'] as const,
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty Overview"
        description="Monitor course health, manage Bloom's Taxonomy learning outcomes, and review AI assessment metrics."
        actions={
          <div className="flex gap-2.5">
            <Button 
              variant="outline" 
              leftIcon={<Sparkles className="w-4 h-4 text-brand-600" />}
              onClick={() => navigate('/faculty/questions')}
            >
              Generate AI Questions
            </Button>
            <Button 
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/faculty/courses')}
            >
              Create Course
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="hover:border-slate-300 transition-all">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{s.value}</h3>
                  <span className="text-[11px] text-slate-400 mt-1 inline-block">{s.change}</span>
                </div>
                <div className={`p-3 rounded-xl ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Active Courses</CardTitle>
                <CardDescription>Courses with active enrollments and ongoing assessments</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/faculty/courses')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-slate-100">
              {recentCourses.map((c) => (
                <div key={c.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        {c.code}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900">{c.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500">
                      {c.students} Students enrolled • {c.assessments} Assessments published
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 font-medium mr-1">Focus:</span>
                      {c.bloomsEmphasis.map((lvl) => (
                        <Badge key={lvl} variant={lvl} size="sm">
                          {BLOOM_LEVELS[lvl].label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/faculty/materials')}
                    >
                      Materials
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => navigate('/faculty/assessments')}
                    >
                      Assessments
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Gap Alerts */}
          <Card className="border-amber-200 bg-amber-50/30">
            <CardHeader className="pb-3 border-amber-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <CardTitle className="text-amber-900">Learning Gap Intelligence</CardTitle>
              </div>
              <CardDescription className="text-amber-700">
                AI and deterministic analytics detected common cognitive drop-offs in recent assessments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              <div className="p-3 bg-white rounded-xl border border-amber-200/80 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                  <Badge variant="analyze" size="sm">Analyze</Badge>
                </div>
                <div className="flex-1">
                  <h5 className="text-xs font-bold text-slate-800">
                    CS-301: Graph Traversal & Topological Sorting
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    38% of students struggle to differentiate BFS and DFS pathfinding constraints under time limits.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs py-1 h-7"
                      onClick={() => navigate('/faculty/questions')}
                    >
                      Generate Remedial Practice
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bloom's Taxonomy Cognitive Distribution */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bloom's Taxonomy Coverage</CardTitle>
              <CardDescription>Target distribution of cognitive levels across all your active courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {ORDERED_BLOOM_LEVELS.map((level) => {
                const meta = BLOOM_LEVELS[level];
                // Mock distribution values for UI demonstration
                const sampleValues: Record<string, number> = {
                  remember: 85,
                  understand: 78,
                  apply: 70,
                  analyze: 62,
                  evaluate: 55,
                  create: 48,
                };
                return (
                  <div key={level} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: meta.color.hex }} 
                        />
                        <span className="font-semibold text-slate-800">{meta.label}</span>
                      </div>
                      <span className="text-slate-500 font-medium">{sampleValues[level]}% Mastery</span>
                    </div>
                    <ProgressBar
                      value={sampleValues[level]}
                      variant={level}
                      size="sm"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick AI Question Assist Card */}
          <Card className="bg-gradient-to-br from-indigo-900 to-brand-900 text-white border-0 shadow-lg">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-300" />
                <h4 className="font-bold text-sm">Gemini Question Assistant</h4>
              </div>
              <p className="text-xs text-indigo-100/90 leading-relaxed">
                Need assessment questions for an upcoming unit? Upload lecture notes or slides and let Gemini generate Bloom-mapped MCQs with full answer rationales.
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full bg-white text-indigo-950 hover:bg-indigo-50 font-semibold"
                onClick={() => navigate('/faculty/questions')}
              >
                Open Question Generator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
