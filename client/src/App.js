import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Static Contents & Styles
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import './App.css'

// Components for each page
import Home from './components/home/home';
import Login from './components/login/login';
import Profile from './components/profile/profile';
import Sim from './components/sim/sim';
import Planner from './components/planner/planner';
import ArenaLB from './components/arena-leaderboard/arenaLB';
import RaidLB from './components/raid-leaderboard/raidLB';
import Blog from './components/blog/blog'

// API Components
import APIProfiles from './components/api/profiles/profiles'

function App() {
  return (
    <Router>
      <div>
        <header>
          <Nav />
        </header>
        {/* User Links */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sim" component={Sim} />
        <Route path="/planner" component={Planner} />
        <Route path="/arena/leaderboard" component={ArenaLB} />
        <Route path="/raid/leaderboard" component={RaidLB} />
        <Route path="/profile" component={Profile} />
        <Route path="/blog" component={Blog} />

        {/* API Links */}
        <Route path="/api/profiles" component={APIProfiles} />
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;