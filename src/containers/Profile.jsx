/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import UpdateInfo from './UpdateInfo';

export default class componentName extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Profile</h1>
        <UpdateInfo />
      </div>
    );
  }
}
