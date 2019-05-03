import React from 'react';
import { Link } from "react-router-dom";
import './footer.min.css';

function Footer() {
  return (
    <div className="footer">
      <div className="left">
        <h3>Tools</h3>
        <p><Link to="/">FAQ</Link></p>
        <p><Link to="/blog">Blog</Link></p>
        <p><Link to="/">Patreon</Link></p>
        <p><Link to="/">Report a bug</Link></p>
        <p><Link to="/">Privacy Policy</Link></p>
        </div>
      <div className="right">
        <h3>Contact</h3>
        <p>Twitter: <Link to="/">@swgohsim</Link></p>
        <p>Discord: <Link to="/">SWGoHSIM</Link></p>
        <p>Email: <Link to="/">support@swgohsim.com</Link></p>
        <p>Created by Nik</p>
      </div>
    </div>
  );
}

export default Footer;