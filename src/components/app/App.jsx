import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import ActionCable from 'actioncable';
import { WSConnection } from '../../settings';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from '../login/Login';
import Orders from '../orders/Orders';
import Profile from '../profile/Profile';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      access_token: undefined,
      isLoggedIn: false
    }

    this.cable = ActionCable.createConsumer(WSConnection);
  }

  componentWillMount() {
    // Get user access token
    const accessToken = this.props.cookies.get('token', { path: '/' });
    console.log(accessToken);
    if (!!accessToken) {
      this.setState({access_token: accessToken, isLoggedIn: true}, () => {
        const { cookies } = this.props;

        axios.interceptors.request.use((config) => {
          config.headers = { Authorization: `Bearer ${accessToken}` };

          return config;
        }, error => Promise.reject(error));

        axios.interceptors.response.use(response => response,
          (error) => {
            if (error.response.request.responseURL.includes('oauth/token')) {
              return error.response;
            } if (error.response.status === 401) {
              cookies.remove('token');
              window.location.href = '/?signIn=true';
            }
            return Promise.reject(error);
          });
      });
      
    } 
  }

  handleLoginLogout = (loggedStatus) => {
    this.setState({
      isLoggedIn: loggedStatus
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    const { cookies } = this.props;
    return (
      <>
        <CookiesProvider>
          <Router>
            <div>
              <Route exact path='/' render={() => (isLoggedIn)? <Redirect to='/orders' /> : <Login handleLogin={this.handleLoginLogout} />} />
              <Route exact path='/orders' component={() => (!isLoggedIn)? <Redirect to='/' /> : <Orders handleLoginLogout={this.handleLoginLogout} cookies={cookies}  />} />
              <Route exact path='/profile' component={() => (!isLoggedIn)? <Redirect to='/' /> : <Profile cookies={cookies} />} />
            </div>
          </Router>
        </CookiesProvider>
      </>
    );
  }
}

export default withCookies(App);
