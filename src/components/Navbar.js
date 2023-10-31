import React, { useState, useEffect } from 'react';

const Navbar = ({ toggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <header id="header" className={`header fixed-top d-flex align-items-center ${isSidebarOpen ? 'toggle-sidebar' : ''}`}>
    <div className="d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center">
        <img src="logo.png" alt="" />
      </a>
      <i onClick={toggleSidebar} className="bi bi-list toggle-sidebar-btn" />
    </div>
    <div className="search-bar">
      <form
        className="search-form d-flex align-items-center"
        method="POST"
        action="#"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter search keyword"
        />
        <button type="submit" title="Search">
          <i className="bi bi-search" />
        </button>
      </form>
    </div>
 
  </header>
  
  )
}

export default Navbar