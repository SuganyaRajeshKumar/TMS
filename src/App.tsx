import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ScreenWrapper from './components/framework/ScreenWrapper';
import { JourneyPlanSummary } from './view/journey_management/JourneyPlanSummary';
import { JourneyPlanScreen } from './view/journey_management/JourneyPlan';
import Login from './view/Login/Login';



const AppRoutes = () => {
const [currentScreen, setCurrentScreen] = useState('login');
  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
        <Route path="/journeyPlan" element={<ScreenWrapper key={location.pathname} screenClass={JourneyPlanSummary} />} />
        <Route path="/journeyPlanNew"  element={<ScreenWrapper key="journeyPlanNew" screenClass={JourneyPlanScreen} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
