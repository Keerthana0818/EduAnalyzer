export type BloomLevel = 
  | 'remember' 
  | 'understand' 
  | 'apply' 
  | 'analyze' 
  | 'evaluate' 
  | 'create';

export interface BloomLevelMeta {
  level: BloomLevel;
  order: number;
  label: string;
  description: string;
  cognitiveProcesses: string[];
  actionVerbs: string[];
  color: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    hex: string;
  };
}

export const BLOOM_LEVELS: Record<BloomLevel, BloomLevelMeta> = {
  remember: {
    level: 'remember',
    order: 1,
    label: 'Remember',
    description: 'Retrieve relevant knowledge from long-term memory (facts, definitions, lists).',
    cognitiveProcesses: ['Recognizing', 'Recalling'],
    actionVerbs: ['Define', 'List', 'Recall', 'Identify', 'Name', 'State', 'Describe'],
    color: {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-300',
      badge: 'bg-slate-100 text-slate-800 border-slate-200',
      hex: '#64748b',
    },
  },
  understand: {
    level: 'understand',
    order: 2,
    label: 'Understand',
    description: 'Construct meaning from instructional messages, including oral, written, and graphic communication.',
    cognitiveProcesses: ['Interpreting', 'Exemplifying', 'Classifying', 'Summarizing', 'Inferring', 'Comparing', 'Explaining'],
    actionVerbs: ['Explain', 'Summarize', 'Interpret', 'Paraphrase', 'Classify', 'Illustrate'],
    color: {
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-300',
      badge: 'bg-sky-100 text-sky-800 border-sky-200',
      hex: '#0284c7',
    },
  },
  apply: {
    level: 'apply',
    order: 3,
    label: 'Apply',
    description: 'Carry out or use a procedure in a given situation (execution and implementation).',
    cognitiveProcesses: ['Executing', 'Implementing'],
    actionVerbs: ['Solve', 'Implement', 'Execute', 'Apply', 'Calculate', 'Demonstrate'],
    color: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      hex: '#16a34a',
    },
  },
  analyze: {
    level: 'analyze',
    order: 4,
    label: 'Analyze',
    description: 'Break material into constituent parts and determine how parts relate to one another and to an overall structure.',
    cognitiveProcesses: ['Differentiating', 'Organizing', 'Attributing'],
    actionVerbs: ['Analyze', 'Compare', 'Contrast', 'Differentiate', 'Deconstruct', 'Examine'],
    color: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-300',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      hex: '#d97706',
    },
  },
  evaluate: {
    level: 'evaluate',
    order: 5,
    label: 'Evaluate',
    description: 'Make judgments based on criteria and standards (checking and critiquing).',
    cognitiveProcesses: ['Checking', 'Critiquing'],
    actionVerbs: ['Evaluate', 'Judge', 'Critique', 'Justify', 'Defend', 'Appraise'],
    color: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-300',
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
      hex: '#7c3aed',
    },
  },
  create: {
    level: 'create',
    order: 6,
    label: 'Create',
    description: 'Put elements together to form a coherent or functional whole; reorganize elements into a new pattern.',
    cognitiveProcesses: ['Generating', 'Planning', 'Producing'],
    actionVerbs: ['Design', 'Construct', 'Formulate', 'Develop', 'Synthesize', 'Author'],
    color: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-300',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      hex: '#e11d48',
    },
  },
};

export const ORDERED_BLOOM_LEVELS: BloomLevel[] = [
  'remember',
  'understand',
  'apply',
  'analyze',
  'evaluate',
  'create',
];
