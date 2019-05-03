import React from 'react';
import { Link } from "react-router-dom";
import './nav.min.css';

function Nav() {
  return (
    <nav>
      <div className="navleft">
        <Link to="/" id="logo">swgohsim</Link>
        <Link to="/sim" id="sim">ModSim</Link>
        <Link to="/blog" id="blog">Blog</Link>
      </div>
      <div className="navright">
        <Link to="/login" id="login">Login</Link>
      </div>
    </nav>
  );
}

export default Nav;