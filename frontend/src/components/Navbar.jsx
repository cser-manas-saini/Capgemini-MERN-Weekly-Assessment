import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>NotesApp</h2>
        </div>
        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink 
            to="/find" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Search size={18} />
            Find Note
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
