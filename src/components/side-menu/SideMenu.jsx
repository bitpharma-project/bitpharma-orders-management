import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const LogoWrapper = styled.div`
  width: 100%;
  height: 120px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px 0px rgb(0, 0, 0, 0.10);
`;

class SideMenu extends React.Component {

  goTo = (url) => {
    this.props.onClose();
    this.props.history.push(url);
  }

  render() {
    const { classes, open } = this.props;

    const sideList = (
      <div className={classes.list}>
       <ListItem button onClick={() => this.goTo('/profile')}>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => this.goTo('/orders')}>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button onClick={() => this.goTo('/support')}>
          <ListItemText primary="Help & support" />
        </ListItem>
        <Divider />
        <List>
          <ListItem button onClick={this.props.handleLogut}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    );
    return (
        <Drawer anchor="right" open={open} onClose={() => this.props.onClose(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.props.onClickDrawer(false)}
            onKeyDown={() => this.props.onKeyDownDrawer(false)}>
              <LogoWrapper>
                <Logo src="logo_dark_bg.svg" alt="Bitpharma | Orders management | Bit orders" />
              </LogoWrapper>
                {sideList}
            </div>
      </Drawer>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SideMenu));