import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router';
import UserInfo from './user-info/UserInfo';
import SideMenu from '../side-menu/SideMenu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Open Sans, sans-serif',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginBottom: '15px'
  },
  menuButton: {
    marginRight: '5px',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '5px',
      width: 'auto',
    },
  },
  searchIcon: {
    width: '30px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '2px 2px 2px 30px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Navbar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        setOpen: false
      }
      this.handleLogout = this.handleLogout.bind(this);
      this.sideMenuRef = React.createRef();
    }

    handleLogout = () => {
      localStorage.removeItem('access_token');
      this.props.history.push('/login');
    }

    openSideMenu = () => {
      console.log('open side menu...');
      console.log(this.sideMenuRef);
      if (this.sideMenuRef) {
        this.sideMenuRef.handleToggle(true)();
      }
    }

    render() {
      const { classes } = this.props;
      return(
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <UserInfo openSideMenuHandler={this.openSideMenu} />
                </div>
                <div>
                  <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                      Farmacia Santa Ana
                  </Typography>
                </div>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              </div>
            </Toolbar>
            <SideMenu handleLogut={this.handleLogout} innerRef={ref => this.sideMenuRef = ref} />
          </AppBar>
        </div>
      );
    }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navbar));