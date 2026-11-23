import type { BloomLevel } from '../lib/bloomsTaxonomy';

export interface QuizQuestion {
  id: string;
  courseCode: string;
  topic: string;
  bloomLevel: BloomLevel;
  difficulty: 'easy' | 'medium' | 'hard';
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  marks: number;
}

export interface DayTimelineItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  type: 'lab' | 'study' | 'quiz' | 'lecture';
  isGlowing?: boolean;
  glowColor?: 'teal' | 'coral' | 'amber';
}

export interface StudentQuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  courseCode: string;
  date: string;
  score: number;
  maxScore: number;
  percentage: number;
  bloomsBreakdown: Record<BloomLevel, { score: number; max: number; percentage: number }>;
  weakBloom: BloomLevel;
  strongBloom: BloomLevel;
}

const INITIAL_TIMELINE: DayTimelineItem[] = [
  {
    id: 't1',
    time: '10:00 AM',
    title: 'Interactive CS201 Lab',
    subtitle: 'Campus Shuttle departs in 5 mins 🚌',
    type: 'lab',
    isGlowing: true,
    glowColor: 'teal',
  },
  {
    id: 't2',
    time: '1:30 PM',
    title: 'Study Group with Team Beta',
    subtitle: 'Room 402B • Algorithms & Dynamic Programming',
    type: 'study',
  },
  {
    id: 't3',
    time: '4:00 PM',
    title: 'Quiz Deadline: AVL Trees & Balance',
    subtitle: 'CS-301 • 25 Marks • Timed Evaluation',
    type: 'quiz',
    isGlowing: true,
    glowColor: 'coral',
  },
];

const INITIAL_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    courseCode: 'CS-301',
    topic: 'AVL Trees',
    bloomLevel: 'remember',
    difficulty: 'easy',
    text: 'What is the maximum allowed difference in height (balance factor) between left and right subtrees in an AVL tree?',
    options: [
      { id: 'A', text: '0 only' },
      { id: 'B', text: '1 (balance factor in {-1, 0, 1})' },
      { id: 'C', text: '2' },
      { id: 'D', text: 'Log(N)' },
    ],
    correctAnswer: 'B',
    explanation: 'An AVL tree strictly requires that for every node, the height difference between left and right subtrees is at most 1.',
    marks: 2,
  },
  {
    id: 'q2',
    courseCode: 'CS-301',
    topic: 'AVL Trees',
    bloomLevel: 'understand',
    difficulty: 'medium',
    text: 'Why does inserting into the left subtree of a left child (LL condition) require only a single right rotation?',
    options: [
      { id: 'A', text: 'Because LL imbalances are linear and a single rotation lifts the middle node to the root while preserving BST ordering.' },
      { id: 'B', text: 'Because it converts the tree directly into a Red-Black tree.' },
      { id: 'C', text: 'Because right rotations duplicate nodes automatically.' },
      { id: 'D', text: 'Because left children have negative heights.' },
    ],
    correctAnswer: 'A',
    explanation: 'In an LL insertion, the three relevant nodes form a straight left line. Rotating the top node right moves the pivot up and restores balance in O(1).',
    marks: 3,
  },
  {
    id: 'q3',
    courseCode: 'CS-301',
    topic: 'AVL Trees',
    bloomLevel: 'apply',
    difficulty: 'medium',
    text: 'Given node X with left child Y and right child Z. If you perform a Left Rotation at node X, which node becomes the new root of the subtree?',
    options: [
      { id: 'A', text: 'Node Y' },
      { id: 'B', text: 'Node Z' },
      { id: 'C', text: 'Node X remains root' },
      { id: 'D', text: 'The parent of X' },
    ],
    correctAnswer: 'B',
    explanation: 'A left rotation pivots node X down to the left and lifts its right child Z up to become the new root.',
    marks: 4,
  },
  {
    id: 'q4',
    courseCode: 'CS-301',
    topic: 'Tree Invariants',
    bloomLevel: 'analyze',
    difficulty: 'hard',
    text: 'Analyze the consequence on asymptotic lookup time if an AVL tree implementation omits rebalancing after node deletion.',
    options: [
      { id: 'A', text: 'Lookup time stays O(1) guaranteed.' },
      { id: 'B', text: 'Over repeated deletions, the tree height can degenerate towards O(N), degrading lookups from O(log N) to linear.' },
      { id: 'C', text: 'Memory consumption doubles immediately.' },
      { id: 'D', text: 'Deletions fail with compile-time syntax errors.' },
    ],
    correctAnswer: 'B',
    explanation: 'Without rebalancing on deletion, subtrees can become severely skewed like a linked list, degrading search complexity to O(N).',
    marks: 5,
  },
  {
    id: 'q5',
    courseCode: 'CS-301',
    topic: 'Algorithm Evaluation',
    bloomLevel: 'evaluate',
    difficulty: 'hard',
    text: 'Evaluate whether an AVL tree or Red-Black tree is preferable when the workload consists of 95% searches and only 5% insertions/deletions.',
    options: [
      { id: 'A', text: 'Red-Black tree, because it allows looser heights.' },
      { id: 'B', text: 'AVL tree, because stricter balancing results in shallower tree depth, providing faster lookup times for read-heavy workloads.' },
      { id: 'C', text: 'Neither, a linked list is faster.' },
      { id: 'D', text: 'Both have identical constant factors in search.' },
    ],
    correctAnswer: 'B',
    explanation: 'AVL trees are more rigidly balanced than Red-Black trees. This makes lookups faster at the expense of slightly more rotation overhead during writes.',
    marks: 5,
  },
  {
    id: 'q6',
    courseCode: 'CS-301',
    topic: 'Data Structure Design',
    bloomLevel: 'create',
    difficulty: 'hard',
    text: 'Design a modification to an AVL tree node to support finding the K-th smallest element in O(log N) time.',
    options: [
      { id: 'A', text: 'Store a "subtree_size" counter in each node, updated during rotations, allowing binary search navigation by rank.' },
      { id: 'B', text: 'Re-sort the entire tree in an array on every query.' },
      { id: 'C', text: 'Invert parent pointers after every read.' },
      { id: 'D', text: 'Store negative numbers in odd depths.' },
    ],
    correctAnswer: 'A',
    explanation: 'Augmenting each node with the size of its subtree allows determining whether the k-th element is in the left subtree, the current node, or the right subtree in O(height) = O(log N).',
    marks: 6,
  },
];

export class MockDatabase {
  private static getStorage<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem('eduanalyzer_' + key);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private static setStorage<T>(key: string, val: T): void {
    try {
      localStorage.setItem('eduanalyzer_' + key, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  static getTimeline(): DayTimelineItem[] {
    return this.getStorage('timeline', INITIAL_TIMELINE);
  }

  static getQuestions(): QuizQuestion[] {
    return this.getStorage('questions', INITIAL_QUESTIONS);
  }

  static addQuestion(q: QuizQuestion): void {
    const list = this.getQuestions();
    this.setStorage('questions', [q, ...list]);
  }

  static getPastAttempts(): StudentQuizAttempt[] {
    return this.getStorage('attempts', [
      {
        id: 'att-1',
        quizId: 'q-asymptotic',
        quizTitle: 'Unit 1: Asymptotic Analysis & Master Theorem',
        courseCode: 'CS-301',
        date: 'Nov 14, 2026',
        score: 28,
        maxScore: 30,
        percentage: 93.3,
        bloomsBreakdown: {
          remember: { score: 10, max: 10, percentage: 100 },
          understand: { score: 8, max: 8, percentage: 100 },
          apply: { score: 7, max: 8, percentage: 87.5 },
          analyze: { score: 3, max: 4, percentage: 75 },
          evaluate: { score: 0, max: 0, percentage: 0 },
          create: { score: 0, max: 0, percentage: 0 },
        },
        weakBloom: 'analyze',
        strongBloom: 'remember',
      },
    ]);
  }

  static saveAttempt(attempt: StudentQuizAttempt): void {
    const list = this.getPastAttempts();
    this.setStorage('attempts', [attempt, ...list]);
  }

  static getLivePoll(): { question: string; totalVotes: number; active: boolean; options: { id: string; text: string; votes: number }[] } {
    return this.getStorage('live_poll', {
      question: 'Will Dijkstra find the shortest path on graphs with negative edge weights?',
      totalVotes: 38,
      active: true,
      options: [
        { id: 'A', text: 'Yes, always', votes: 4 },
        { id: 'B', text: 'No, greedy choice can be deceived', votes: 31 },
        { id: 'C', text: 'Only if graph is bipartite', votes: 3 },
      ],
    });
  }

  static votePoll(optionId: string): void {
    const poll = this.getLivePoll();
    const opt = poll.options.find(o => o.id === optionId);
    if (opt) {
      opt.votes += 1;
      poll.totalVotes += 1;
      this.setStorage('live_poll', poll);
    }
  }

  static getQuestionQueue(): { id: string; student: string; question: string; time: string }[] {
    return this.getStorage('question_queue', [
      { id: 'qq1', student: 'Alex Johnson', question: 'Does a Double Left-Right rotation ever change the height of the left grandchild?', time: '2m ago' },
      { id: 'qq2', student: 'Priya Sharma', question: 'Can Bellman-Ford be optimized with early termination if no distances update in a pass?', time: '4m ago' },
      { id: 'qq3', student: 'Jordan Miller', question: 'Why does topological sort require a Directed Acyclic Graph (DAG)?', time: '6m ago' },
    ]);
  }

  static dismissQuestion(id: string): void {
    const list = this.getQuestionQueue().filter(q => q.id !== id);
    this.setStorage('question_queue', list);
  }
}
