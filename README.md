# EduAnalyzer – AI-Powered Student Learning and Ability Analysis Platform

A complete, responsive web application connecting faculty and students that analyses student learning abilities using assessment results and **Bloom's Revised Taxonomy** (*Remember, Understand, Apply, Analyze, Evaluate, Create*), integrated with **Google Gemini AI** and **Supabase**.

---

## 🚀 Technology Stack

- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL with Row-Level Security)
- **Authentication**: Supabase Auth (Role-based: Faculty & Student)
- **File Storage**: Supabase Storage (`course-materials` bucket)
- **Serverless Compute**: Supabase Edge Functions (Deno / TypeScript)
- **AI Integration**: Google Gemini API (Structured JSON schema outputs via backend)
- **Visual Analytics**: Recharts
- **Version Control**: Git & GitHub

---

## 🌟 Key Architecture & Capabilities

1. **Bloom's Taxonomy Cognitive Engine**:
   - Every question and course outcome is associated with one of the 6 cognitive domains (*Remember, Understand, Apply, Analyze, Evaluate, Create*).
   - Generates granular cognitive ability radar profiles, not just raw numerical marks.

2. **Deterministic Server-Side Grading**:
   - Assessment answers are evaluated deterministically on the server.
   - AI is strictly prohibited from altering or inventing grades.

3. **AI-Assisted Question Generation (Gemini AI)**:
   - Faculty can generate Bloom-mapped assessment questions directly from uploaded syllabus materials or lecture slides.
   - Includes mandatory faculty review, edit, approve, or reject workflows.

4. **Actionable AI Recommendations**:
   - Based on deterministic assessment data, Gemini synthesizes plain-language gap analyses, personalized study plans, and targeted practice recommendations for struggling students.

5. **Anti-Leak Assessment Security**:
   - Assessment answer keys and explanations are protected by Supabase Row-Level Security (RLS) and never sent to the client during active quiz attempts.

---

## 🛠️ Getting Started (Development Setup)

### Prerequisites:
- [Node.js](https://nodejs.org/) (v18 or newer; v24 recommended)
- [Git](https://git-scm.com/)

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd EduAnalyzer
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase project URL and anonymous key.

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
EduAnalyzer/
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI primitives (Button, Card, Modal, Input, Badge, ProgressBar)
│   │   └── layout/             # AppLayout, Navbar, FacultySidebar, StudentSidebar, PageHeader
│   ├── context/
│   │   └── RolePreviewContext.tsx # Role management & preview provider
│   ├── lib/
│   │   ├── bloomsTaxonomy.ts   # Canonical Bloom's taxonomy definitions, verbs, colors
│   │   └── utils.ts            # Formatting & tailwind utilities
│   ├── pages/
│   │   ├── faculty/            # Faculty Dashboard, Courses, Outcomes, Materials, Questions, Assessments, Analytics
│   │   ├── student/            # Student Dashboard, Catalog, Courses, Assessments, Analytics, Assistant, Recommendations
│   │   └── LandingPage.tsx     # Role-based entrance & feature showcase
│   ├── types/
│   │   ├── models.ts           # Course, Unit, Profile, and Learning Outcome types
│   │   └── blooms.types.ts     # Bloom's taxonomy interfaces
│   ├── App.tsx                 # Route declarations & role routing
│   └── main.tsx                # App entrypoint
├── supabase/                   # Migrations & Edge Functions (Phases 2-9)
├── .env.example                # Safe environment variable template
└── tailwind.config.js          # Custom Bloom's Taxonomy color palettes
```

---

## 🗺️ Incremental Development Milestones

- [x] **Phase 1: Project Setup and UI Foundation** (Complete)
- [ ] **Phase 2: Database and Authentication**
- [ ] **Phase 3: Course Creation and Registration**
- [ ] **Phase 4: Bloom's Taxonomy and Learning Outcomes**
- [ ] **Phase 5: Course Material Uploads**
- [ ] **Phase 6: AI Question Generation**
- [ ] **Phase 7: Assessment System**
- [ ] **Phase 8: Performance Analysis**
- [ ] **Phase 9: Personalised AI Recommendations**
- [ ] **Phase 10: Testing, Optimisation and Deployment**
