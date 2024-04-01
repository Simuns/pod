// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import ReturnUsers from './ReturnUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/returnusers" element={<ReturnUsers />} />
        {/* Setup more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;