import React, { Component } from 'react';
import NavBar from '../navbar/Navbar';
import Orders from '../orders/Orders';
export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Orders />
      </div>
    );
  }
}
