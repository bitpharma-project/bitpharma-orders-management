import React, { Component } from 'react';
import NavBar from '../navbar/Navbar';
import { Server } from '../../settings';
import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { NOTIFICATION_TYPES } from '../../constants/NotificationTypes';
import withAPI from '../../utils/withAPI';

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
    this.API = this.props.API;
  }

  componentWillMount = () => {
    const { user } = this.props;
    if (user.email.length <= 0) {
      // Fetch the user
      this.API.get('/user').then(data => {
        this.setState({
          user: {
            complete_name: data.data.complete_name,
            email: data.data.email,
            imgUrl: data.data.profile_picture_url,
            role: 'Product Manager'
          },
          imgeSelected: data.data.profile_picture_url,
          currentImg: data.data.profile_picture_url,
        });
      });
    } else {
      this.setState({
        user: {
          complete_name: user.fullName,
          email: user.email,
          imgUrl: user.photoUrl,
          role: 'Product Manager'
        },
        imgeSelected: user.photoUrl,
        currentImg: user.photoUrl,
      });
    }
  }

  componentWillUnmount = () => {
    // Set user name to previous
    this.props.cleanUserNameCopy();
  }

  handleChange = (e) => {
    const { user } = this.state;
    user.complete_name = e.target.value;
    this.setState({
      user: user
    });
  }

  handleNameChange = (e) => {
    const { user } = this.state;
    user.complete_name = e.target.value;
    this.setState({
      user: user
    }, () => {
      this.props.onNameChange(this.state.user.complete_name);
    });
  }

  saveUserInfo = (e) => {
    e.preventDefault();
    const { user, imgeSelected, currentImg } = this.state;

    let modifyUser = {
      complete_name: user.complete_name
    }

    this.API.patch('/user', modifyUser).then(data => {
      this.props.addNotification(
        "Success",
        "User info was saved successfully!",
        2000,
        NOTIFICATION_TYPES.SUCCESS
      );
      this.props.rewriteUserInfo({
        complete_name: user.complete_name,
        profile_picture_url: imgeSelected,
      });
    }, err => {
      this.props.addNotification(
        ":( Error when saving user info",
        "Please, contact your administrator if the problem persist.",
        2000,
        NOTIFICATION_TYPES.ERROR
      );
    });

    if(imgeSelected && imgeSelected !== currentImg) {
      let imageData = new FormData();
      imageData.append("image", imgeSelected);

      this.API.post('/user/profile_picture', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }).then(data => {
        let response = data.data;
        user.imgUrl = response.profile_picture_url;
        this.setState({
          user: user
        });
       
      }, err => {
        this.props.addNotification(
          ":( Error when saving the picture",
          "Please, contact your administrator if the problem persist.",
          2000,
          NOTIFICATION_TYPES.ERROR
        );
      })
    }
  }

  handleImage = (e) => {
    this.setState({
      imgeSelected: e.target.files[0]
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
      <form encType="multipart/form-data">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ marginTop: '20px', marginBottom: '2opx', marginLeft: '15px', fontWeight: '600', fontSize: '1.25rem'}}>Profile information</span>
            </div>
          </div>
          <div style={{ wisth: '100%', display: 'flex', flexDirection: 'column', margin: '25px', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ borderRadius: '50%', margin: '16px' }} height="160px" width="160px" alt={user.email} src={user.imgUrl? `${Server}/${user.imgUrl}` : useImgUrl} />
            <input type="file" name="img" placeholder="Select image" onChange={this.handleImage} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Paper style={{ width: '600px', padding: '16px', margin: '16px'  }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="complete_name"
                  label="Full name"
                  className={classes.textField}
                  value={this.state.user.complete_name}
                  onChange={this.handleNameChange}
                  margin="normal"
                  fullWidth={true}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="email"
                  label="Email"
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
              <Button type="submit" variant="outlined" color="primary" fullWidth className={classes.button} onClick={this.saveUserInfo}>Save</Button>
            </div>
          </div>
      </form>
    );
  }
}

export default withStyles(styles)(withCookies(withAPI(Profile)));