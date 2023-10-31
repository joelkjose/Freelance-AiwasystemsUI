import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link
            className={`nav-link ${location.pathname === '/' ? 'active ' : 'collapsed'}`}
            to="/">
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`nav-item ${location.pathname === '/enquiry' ? '' : ''}`}>
          <Link
            className={`nav-link ${location.pathname === '/enquirey' ? ' ' : 'collapsed'}`}
            to="/enquirey">
            <i className="bi bi-chat-dots" />
            <span>Enquirey</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

