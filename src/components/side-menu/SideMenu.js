import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SideMenu extends React.Component {
    state = {
        open: false
    };
  
    handleToggle = (open) => () => { 

        this.setState({open: open})
    };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const sideList = (
      <div className={classes.list}>
        <Divider />
        <List>
            <ListItem button onClick={this.props.handleLogut}>
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
      </div>
    );
    return (
        <Drawer open={open} onClose={this.handleToggle(false)}>
            <div
            tabIndex={0}
            role="button"
            onClick={this.handleToggle(false)}
            onKeyDown={this.handleToggle(false)}>
                {sideList}
            </div>
      </Drawer>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);