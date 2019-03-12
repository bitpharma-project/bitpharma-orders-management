import React, { Component } from 'react';
import Orders from '../orders/Orders';
import { withRouter } from 'react-router-dom'
import Login from '../login/Login';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      acces_token: undefined,
      tokenIsValid: false
    }
  }

  componentWillMount() {
    // Get user access token
    let accessToken = localStorage.getItem('access_token');
    if (!!accessToken && this.tokenIsValid(accessToken)) {
      this.setState({acces_token: accessToken, tokenIsValid: true});
    } 
  }

  tokenIsValid = (token) => {
    // Obviously, this is just for testing purposes
    // We should validate this with the backend
    if (typeof token === 'string' && token.length > 7) {
      console.log('ACCESS TOKEN IS OK: ' + token);
      return true;
    }
    return false;
  }

  render() {
    const { tokenIsValid } = this.state;
    if (tokenIsValid) {
      return <Orders />
    }
    return (
      <Login />
    );
  }
}

export default withRouter(App);
