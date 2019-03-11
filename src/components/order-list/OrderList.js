import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import OrderItem from '../order-item/OrderItem';
import { Droppable } from 'react-beautiful-dnd';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height: '100vh',
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper,
  },
  rootHighlight: {
    width: '100%',
    maxWidth: 360,
    height: '100vh',
    border: 'dashed 1px #14A8C3',
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class OrderList extends Component{

    constructor(props) {
        super(props);
    }

    render(){ 
        const { classes, orders, droppableId, showHighlight } = this.props;

        let toApplyClasses = {classes};
        if (showHighlight) {
            toApplyClasses.root = classes.rootHighlight;
        } else {
            toApplyClasses.root = classes.root;
        }

        console.log('Orderlist ---');
        console.log(this.props);
        console.log(classes.root);
        console.log(toApplyClasses.root);

        return (
        <Droppable droppableId={droppableId}>
        {(provided) => (
                <div 
                ref={provided.innerRef} 
                {...provided.droppableProps}>
                    <List className={toApplyClasses.root}>
                        {orders.map((order, index) => {
                            let userNote = '';
                            if (!!order.userNote) {
                                userNote = order.userNote
                            }
                            return (
                                <OrderItem 
                                    handleOnDragItem={this.props.onDragItem}
                                    key={order.id} 
                                    id={order.id}
                                    name={order.name} 
                                    description={order.description}
                                    userNote={(!!order.userNote)? order.userNote : ''}
                                    userProfileImage={order.userProfileImage}
                                    classes={classes}
                                    index={order.id} />
                                );
                            })}
                    </List>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        );
    }
}

OrderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderList);