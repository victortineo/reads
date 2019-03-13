import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';


class Category extends Component {
  render() {
    return (
      <div className="Category">
        <Dashboard category={this.props.match.params.category}/>
      </div>
    );
  }
}

export default connect()(Category)
