import React, { Component } from 'react';
import './profiles.min.css';

class APIProfiles extends Component {
  constructor() {
    super();
    this.state = {
      profiles: []
    }
  }
  
  componentDidMount() {
    fetch('/api/profiles')
      .then(res => res.json())
      .then(profiles => this.setState({profiles}, () => console.log('Profiles fetched...', profiles)));
  }

  render() {
    return (
      <div className="apiProfilesContents">
        <h1>Player Profiles</h1>
        <ul>
          {this.state.profiles.map(profile =>
              <li key={profile.id}>{profile.firstName} {profile.LastName}</li>)}
        </ul>
      </div>
    );
  }
}

export default APIProfiles;