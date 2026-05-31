import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ResultPage from './pages/ResultPage';
import SkillPage from './pages/SkillPage';
import SkillResultPage from './pages/SkillResultPage';
import ProfilePage from './pages/ProfilePage';
import HistoryDetailPage from './pages/HistoryDetailPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/skill" element={<SkillPage />} />
        <Route path="/skill-result" element={<SkillResultPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history/:careerId" element={<HistoryDetailPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
