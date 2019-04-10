import React from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { ApiServer, Server } from '../../../settings';

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
            userRole: 'Product Manager',
            userImageUrl: 'https://britz.mcmaster.ca/images/nouserimage.gif/image'
        }
    }

    render() {
        const { userImageUrl, userRole } = this.state;
        const { classes, user } = this.props;
        console.log(user);
        return (
            <UserInfoWrapper>
                <img alt={user.firstName} src={user.imgUrl? `${Server}/${user.imgUrl}` : userImageUrl} style={{borderRadius: '50%'}} width="50px" height="50px" />
                <InfoWrapper>
                    <div><span style={{fontSize: '600'}}>{user.complete_name}</span></div>
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