import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';


class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Dashboard />
      </div>
    );
  }
}

export default connect()(Home)
