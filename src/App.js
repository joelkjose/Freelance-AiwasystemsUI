import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Enquirey from './pages/Enquirey';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    document.body.classList.toggle('toggle-sidebar', isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <Router>
      <div className="App">
        <div className={`app ${isSidebarOpen ? '' : 'collapsed'}`}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Dashboard />} />
            <Route path="Products" element={<Products />} />
            <Route path="enquirey" element={<Enquirey />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;
