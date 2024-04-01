// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import ReturnUsers from './ReturnUsers';
import CreatePodcast from './components/pod/CreatePod';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/returnusers" element={<ReturnUsers />} />
        <Route path="/createpodcast" element={<CreatePodcast />} />
        {/* Setup more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;