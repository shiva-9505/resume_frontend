import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import VerifyPage from './pages/VerifyPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
