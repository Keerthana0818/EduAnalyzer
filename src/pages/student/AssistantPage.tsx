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
      text: 'Hello Alex! I am your AI Study Assistant for CS-301. I am grounded in the lecture notes and slides uploaded by Prof. Jenkins. How can I help you master today’s concepts?',
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

    // Simulate AI response grounded in course context
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Based on Prof. Jenkins's Unit 2 notes on "${currentQuery}", remember that the fundamental invariant is maintaining a balance factor between -1 and +1 for every node. Let me know if you would like step-by-step pseudo-code or an example calculation!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Study Assistant"
        description="Grounded in your course syllabus and professor's lecture slides to help you understand complex concepts."
        badge={
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" /> Gemini 2.0 Context Grounded
          </span>
        }
      />

      <Card className="flex flex-col h-[650px] overflow-hidden">
        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Tutor: Data Structures & Algorithms</h4>
              <p className="text-[11px] text-slate-400">Context: 3 Course Units • 15 Lecture PDFs Indexed</p>
            </div>
          </div>
          <Badge variant="outline" size="sm">CS-301</Badge>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div key={idx} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${isUser ? 'bg-brand-600 text-white' : 'bg-emerald-100 text-emerald-800'}`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`p-3.5 rounded-2xl text-xs max-w-lg leading-relaxed ${isUser ? 'bg-brand-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none whitespace-pre-line'}`}
                >
                  {m.text}
                  <span
                    className={`block text-[10px] mt-1.5 ${isUser ? 'text-brand-200 text-right' : 'text-slate-400'}`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <Input
            placeholder="Ask a question about lecture notes, algorithms, or concepts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white" leftIcon={<Send className="w-4 h-4" />}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};
