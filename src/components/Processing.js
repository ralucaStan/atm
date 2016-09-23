import React, { Component } from 'react';
import processing from './../images/processing.gif';
import './Processing.css';

export default class Processing extends Component {
  render() {
    return (
      <div className="Processing">
          <img src={processing} alt="Processing..." />
      </div>
    );
  }
}
