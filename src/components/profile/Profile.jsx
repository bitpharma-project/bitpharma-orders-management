import React, { Component } from 'react';
import NavBar from '../navbar/Navbar';
import axios from 'axios';
import { ApiServer } from '../../settings';
import { withCookies } from 'react-cookie';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit
  },
});

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    this.axiosInstance = axios.create({
      baseURL: ApiServer,
      timeout: 15000,
      headers: {
        'Authorization': `Bearer ${this.props.cookies.get('token', { path: '/' })}`,
        'Content-Type': 'application/json'
      }
    });
  }

  componentWillMount = () => {
    this.axiosInstance.get('/user').then(data => {
      this.setState({
        user: {
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          email: data.data.email,
          imgUrl: data.data.profile_picture_url,
          role: 'Product Manager'
        },
        imgeSelected: ''
      });
    });
  }

  handleChange = (e) => {
    const { user } = this.state;
    user.firstName = e.target.value;
    this.setState({
      user: user
    });
  }

  handleChangeLastname = (e) => {
    const { user } = this.state;
    user.lastName = e.target.value;
    this.setState({
      user: user
    });
  }

  saveUserInfo = () => {
    const { user, imgeSelected } = this.state;
    let modifyUser = {
      first_name: user.firstName,
      last_name: user.lastName,
      profile_picture_url: imgeSelected
    }
    this.axiosInstance.patch('/user', modifyUser).then(data => {
      console.log('Saved succefully!!');
      console.log(data);
    });
    this.axiosInstance.post('/user/profile_picture', {image: imgeSelected}).then(data => {
      console.log('Photo saved!!');
    })
  }

  handleImage = (e) => {
    this.setState({
      imgeSelected: e.target.value
    });
  }

  handleLogout = (e) => {
    this.props.handleLoginLogout(e);
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    
    if (user == null) return null;

    let useImgUrl = user.imgUrl;
    if (user.imgUrl === null) useImgUrl = 'https://britz.mcmaster.ca/images/nouserimage.gif/image';

    return(
      <div>
          <NavBar handleLogout={this.handleLogout} user={this.state.user} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ marginTop: '20px', marginBottom: '2opx', marginLeft: '15px', fontWeight: '600', fontSize: '1.25rem'}}>Profile information</span>
            </div>
          </div>
          <div style={{ wisth: '100%', display: 'flex', flexDirection: 'column', margin: '25px', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ borderRadius: '50%', margin: '16px' }} height="160px" width="160px" alt={user.email} src={user.imgUrl? `${ApiServer}/${user.imgUrl}` : useImgUrl} />
            <input type="file" name="img" placeholder="Select image" onChange={this.handleImage} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Paper style={{ width: '600px', padding: '16px', margin: '16px'  }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="firstName"
                  label="Name"
                  className={classes.textField}
                  value={this.state.user.firstName}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <TextField
                  id="lastName"
                  label="Name"
                  className={classes.textField}
                  value={this.state.user.lastName}
                  onChange={this.handleChangeLastname}
                  margin="normal"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="email"
                  label="Name"
                  disabled
                  className={classes.textField}
                  value={this.state.user.email}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <TextField
                  id="role"
                  label="Role"
                  disabled
                  className={classes.textField}
                  value={this.state.user.role}
                  onChange={this.handleChange}
                  margin="normal"
                />
              </div>
            </Paper>
            <div>
              <Button variant="outlined" color="primary" fullWidth className={classes.button} onClick={this.saveUserInfo}>Save</Button>
            </div>
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(withCookies(Profile));