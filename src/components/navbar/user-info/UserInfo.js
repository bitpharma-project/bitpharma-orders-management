import React from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Open Sans, sans-serif';
    padding: 5px;
    margin-left: 5px;
`;
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const styles = theme => ({
    icon: {
        fontSize: 32
    }
})

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'Mia Sketch',
            userRole: 'Product Manager',
            userImageUrl: 'https://pbs.twimg.com/profile_images/3687297504/cee48cd2318bbdf4263f96c760eba67c_400x400.jpeg'
        }
    }

    render() {
        const { userImageUrl, userName, userRole } = this.state;
        const { classes } = this.props;
        return (
            <UserInfoWrapper>
                <img alt={userName} src={userImageUrl} style={{borderRadius: '50%'}} width="50px" height="50px" />
                <InfoWrapper>
                    <div><span style={{fontSize: '600'}}>{userName}</span></div>
                    <div><span>{userRole}</span></div>
                </InfoWrapper>
                <IconButton onClick={this.props.openSideMenuHandler}>
                    <ExpandMoreIcon className={classes.icon} />
                </IconButton>
            </UserInfoWrapper>
        );
    }
}

export default withStyles(styles)(UserInfo);