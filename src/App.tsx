import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RolePreviewProvider } from './context/RolePreviewContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { FluidShowcasePage } from './pages/FluidShowcasePage';

// Faculty pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { CoursesPage } from './pages/faculty/CoursesPage';
import { OutcomesPage } from './pages/faculty/OutcomesPage';
import { MaterialsPage } from './pages/faculty/MaterialsPage';
import { QuestionsPage } from './pages/faculty/QuestionsPage';
import { AssessmentsPage } from './pages/faculty/AssessmentsPage';
import { AnalyticsPage } from './pages/faculty/AnalyticsPage';

// Student pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { CatalogPage } from './pages/student/CatalogPage';
import { StudentCoursesPage } from './pages/student/StudentCoursesPage';
import { StudentAssessmentsPage } from './pages/student/StudentAssessmentsPage';
import { StudentAnalyticsPage } from './pages/student/StudentAnalyticsPage';
import { AssistantPage } from './pages/student/AssistantPage';
import { RecommendationsPage } from './pages/student/RecommendationsPage';

export function App() {
  return (
    <RolePreviewProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Dynamic Showcase */}
          <Route path="/" element={<FluidShowcasePage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/fluid" element={<FluidShowcasePage />} />

          {/* Application Layout for Faculty & Student */}
          <Route element={<AppLayout />}>
            {/* Faculty Routes */}
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/courses" element={<CoursesPage />} />
            <Route path="/faculty/outcomes" element={<OutcomesPage />} />
            <Route path="/faculty/materials" element={<MaterialsPage />} />
            <Route path="/faculty/questions" element={<QuestionsPage />} />
            <Route path="/faculty/assessments" element={<AssessmentsPage />} />
            <Route path="/faculty/analytics" element={<AnalyticsPage />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/catalog" element={<CatalogPage />} />
            <Route path="/student/courses" element={<StudentCoursesPage />} />
            <Route path="/student/assessments" element={<StudentAssessmentsPage />} />
            <Route path="/student/analytics" element={<StudentAnalyticsPage />} />
            <Route path="/student/assistant" element={<AssistantPage />} />
            <Route path="/student/recommendations" element={<RecommendationsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RolePreviewProvider>
  );
}

export default App;
