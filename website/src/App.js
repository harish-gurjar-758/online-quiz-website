import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Componants/Home/Home';
import ManuBar from './Componants/ManuBar/ManuBar';
import QutionPage from './Componants/Qutions/QutionPage';
import AdminIndex from './Admin/AdminIndex';
import CandidateGetDetail from './Componants/Pages/CandidateGetDetail/CandidateGetDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <ManuBar />
        <Routes>

          {/* Admin Panel */}
          <Route path='/admin' element={<AdminIndex />} />

          {/* Main Site  */}
          <Route path="/" element={<CandidateGetDetail />} />
          <Route path="/quiz-app-home" element={<Home />} />
          <Route path="/questions" element={<QutionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 