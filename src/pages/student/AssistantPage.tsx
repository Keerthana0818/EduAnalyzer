import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles
} from 'lucide-react';

export const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello Alex! I am your AI Study Assistant for CS-301. I am grounded in the lecture notes and slides uploaded by Dr. Elena. How can I help you master today’s concepts?',
      timestamp: '10:00 AM',
    },
    {
      role: 'user',
      text: 'Can you explain the difference between a Left-Right (LR) double rotation and a Right-Left (RL) rotation in an AVL tree in simple terms?',
      timestamp: '10:01 AM',
    },
    {
      role: 'assistant',
      text: 'Great question! In AVL trees, double rotations fix "zig-zag" imbalances:\n\n1. Left-Right (LR) Rotation: Occurs when a node is left-heavy, but its left child is right-heavy (left-right bent). You first rotate the left child to the left, which straightens it into a left-left line, then rotate the root to the right.\n\n2. Right-Left (RL) Rotation: The mirror image. The node is right-heavy, and its right child is left-heavy. You rotate the right child to the right first, then rotate the root to the left.\n\nWould you like me to generate a 2-question practice quiz on this?',
      timestamp: '10:02 AM',
    },
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = input;
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Based on Dr. Elena's Unit 2 slides regarding "${currentQuery}":\n\nRemember the golden invariant: every node must have a balance factor between -1 and +1. When calculating subtree heights, always take 1 + max(left_height, right_height). If you want, I can step through an AVL deletion example on paper!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Study Assistant"
        description="Grounded in your course syllabus and professor's lecture slides to help you understand complex concepts."
        badge={
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/40 shadow-glow-teal">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Gemini 2.0 Flash Context
          </span>
        }
      />

      <Card className="flex flex-col h-[650px] overflow-hidden border border-white/10 bg-[#0C1220]/80 backdrop-blur-2xl shadow-glass">
        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-cyan-500 text-slate-950 font-bold flex items-center justify-center shadow-glow-teal">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Tutor: Algorithms & Cognitive AI</h4>
              <p className="text-[10px] text-teal-400">Context: CS-301 Lecture Slides • Dr. Elena</p>
            </div>
          </div>
          <Badge variant="teal" size="sm">Active Session</Badge>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div key={idx} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${isUser ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'}`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`p-4 rounded-2xl text-xs max-w-lg leading-relaxed ${isUser ? 'bg-gradient-to-r from-cyan-600 to-teal-500 text-slate-950 font-semibold rounded-tr-none shadow-glow-teal' : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-none whitespace-pre-line'}`}
                >
                  {m.text}
                  <span
                    className={`block text-[10px] mt-2 ${isUser ? 'text-slate-900/80 text-right' : 'text-slate-500'}`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-teal-400 italic">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Gemini is synthesizing explanation from lecture notes...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-[#080C14] border-t border-white/[0.08] flex items-center gap-2">
          <Input
            placeholder="Ask a question about lecture notes, algorithms, or concepts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="teal" leftIcon={<Send className="w-4 h-4" />}>
            Ask
          </Button>
        </form>
      </Card>
    </div>
  );
};
