import React from 'react';
import { Link } from "react-router-dom";
import './home.min.css';

function Home() {
  return (
    <div>
      <div className="title">
        <h1>Welcome to&nbsp;&nbsp;<span className="swfont">swgohsim</span></h1>
        <h2>Sim mods for your characters, track progress with our mod planner, view leaderboards and more.</h2>
      </div>
      <hr />
      <div className="contents">
        <div className="message">
          <a href="/">This is a message to users</a>
        </div>
        <div className="blocks">
          <Link to="/sim" className="block sim">
            <i className="fas fa-brain"></i>
            <div className="text">
              <h4>Sim Mods</h4>
              <p>Simulate mods to discover which are most effective.</p>
            </div>
          </Link>
          <Link to="/planner" className="block planner">
            <i className="fas fa-map"></i>
            <div className="text">
              <h4>Mod Planner</h4>
              <p>Track your progress on obtaining the mods you need.</p>
            </div>
          </Link>
          <Link to="/arena/leaderboard" className="block arena">
              <i className="fas fa-crown"></i>
            <div className="text">
              <h4>Arena Leaderboard</h4>
              <p>Check out top players in the Arena Leaderboard.</p>
            </div>
          </Link>
          <Link to="/raid/leaderboard" className="block raid">
              <i className="fab fa-fort-awesome"></i>
              <div className="text">
                <h4>Raid Leaderboard</h4>
                <p>Check out top players in the Raid Leaderboard.</p>
              </div>
          </Link>
          <Link to="/profile" className="block profile">
            <i className="fas fa-hammer"></i>
            <div className="text">
              <h4>My Profile</h4>
              <p>Create or View My Profile.</p>
            </div>
          </Link>
          <div className="block blockimg">
              <i className="fas fa-jedi"></i>
              <i className="fab fa-sith"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;