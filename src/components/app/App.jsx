import React, { Component } from 'react';
import { withRouter, Switch } from 'react-router-dom'
import { withCookies, CookiesProvider } from 'react-cookie';
import axios from 'axios';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from '../login/Login';
import Orders from '../orders/Orders';
import Profile from '../profile/Profile';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { NOTIFICATION_TYPES } from "../../constants/NotificationTypes";
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      access_token: undefined,
      isLoggedIn: false
    }

    this.notificationDOMRef_info = React.createRef();
    this.notificationDOMRef_sucess = React.createRef();
    this.notificationDOMRef_error = React.createRef();
  }

  addNotification = (title, message, duration, type) => {
    let obj = this.notificationDOMRef_info;
    if (type === NOTIFICATION_TYPES.SUCCESS)
      obj = this.notificationDOMRef_sucess;
    else if (type === NOTIFICATION_TYPES.ERROR)
      obj = this.notificationDOMRef_error;

    obj.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: duration },
      dismissable: { click: true }
    });
  };

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
              <ReactNotification ref={this.notificationDOMRef_info} />
              <ReactNotification ref={this.notificationDOMRef_error} />
              <ReactNotification ref={this.notificationDOMRef_sucess} />
              <Switch>
                <Route exact path='/' render={() => (isLoggedIn)? <Redirect to='/orders' /> : <Login handleLogin={this.handleLoginLogout} />} />
                <Route exact path='/orders' render={() => (!isLoggedIn)? <Redirect to='/' /> : <Orders addNotification={this.addNotification} handleLoginLogout={this.handleLoginLogout} cookies={cookies}  />} />
                <Route exact path='/profile' render={() => (!isLoggedIn)? <Redirect to='/' /> : <Profile addNotification={this.addNotification} handleLoginLogout={this.handleLoginLogout} cookies={cookies} />} />
              </Switch>
            </div>
          </Router>
        </CookiesProvider>
      </>
    );
  }
}

export default withCookies(App);
