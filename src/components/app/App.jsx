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
import { APIContext } from '../../utils/API';
import { ApiServer } from '../../settings';
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

    this.API = axios.create({
      baseURL: ApiServer,
      responseType: "json"
    });
    
    this.API.interceptors.request.use((config) => {
      config.headers = { Authorization: `Bearer ${this.props.cookies.get('token', { path: '/' })}` };
      return config;
    }, error => Promise.reject(error));
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
    if (!!accessToken) {
      this.setState({access_token: accessToken, isLoggedIn: true}, () => {
        this.configureAxios();
      });
    }
  }

  configureAxios = () => {
    const { access_token } = this.props;
    this.API.interceptors.request.use((config) => {
      config.headers = { Authorization: `Bearer ${access_token}` };
      return config;
    }, error => Promise.reject(error));
  }

  handleLoginLogout = async (loggedStatus) => {
    await this.configureAxios();
    this.setState({
      isLoggedIn: loggedStatus
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    const { cookies } = this.props;
    return (
      <APIContext.Provider value={this.API}>
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
      </APIContext.Provider>
    );
  }
}

export default withCookies(App);
