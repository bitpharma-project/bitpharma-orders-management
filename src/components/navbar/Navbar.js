import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles, Typography, Toolbar, IconButton, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
const styles = {
  root: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #201E48 30%, #6C539E 90%)',
    marginBottom: '80px',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navbar extends Component {

    constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
      localStorage.removeItem('access_token');
      this.props.history.push('/login');
    }

    render() {
      const { classes } = this.props;
      return(
        <div className={classes.root}>
          <AppBar position="fixed" classes={{root: classes.root}}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Bit orders
              </Typography>
              <Button onClick={this.handleLogout} color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
        // <AppBar position="sticky" classes={{root: classes.root, label: classes.label}}>
        //   <Toolbar>
        //     <Typography variant="title" color="inherit">
        //       Orders management
        //     </Typography>
        //  </Toolbar>
        //  <img className={classes.logo} src={logo} alt="Logo" width="60px" height="60px" />
        // </AppBar>
      );
    }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navbar));