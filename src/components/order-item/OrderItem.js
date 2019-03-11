import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd'; // Both at the same time

class OrderItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {id, name, description, userProfileImage, userNote, index, classes} = this.props;
        return(
            <Draggable
                id={id}
                index={index}
                draggableId={id}>
                   {(provided) => (
                       <div 
                       ref={provided.innerRef}
                       {...provided.draggableProps}
                       {...provided.dragHandleProps}>

                            <ListItem style={{zIndex: '100'}} key={id} alignItems="flex-start">
                                <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={userProfileImage} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography component="span" className={classes.inline} color="textPrimary">
                                                {description}
                                            </Typography>
                                            {userNote}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                       
                       </div>
                   )}
            </Draggable>
        );
    }
}

export default OrderItem;