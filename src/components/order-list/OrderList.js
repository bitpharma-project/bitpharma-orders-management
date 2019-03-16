import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import OrderItem from '../order-item/OrderItem';
import { Droppable } from 'react-beautiful-dnd';
import TitleOrderList from './title-order-list/TitleOrderList';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height: '100vh',
    margin: '0 auto',
  },
  rootHighlight: {
    width: '100%',
    maxWidth: 360,
    height: '100vh',
    border: 'dashed 1px #14A8C3',
    transition: '0.5s',
    margin: '0 auto',
  },
  inline: {
    display: 'inline',
  },
});

class OrderList extends Component{
    render(){ 
        const { classes, orders, droppableId, showHighlight } = this.props;

        let toApplyClasses = {classes};
        if (showHighlight) {
            toApplyClasses.root = classes.rootHighlight;
        } else {
            toApplyClasses.root = classes.root;
        }

        return (
          <React.Fragment>
            <TitleOrderList
              title={this.props.title}
              classes={classes}
              totalItems={orders.length}
            />
            <Droppable droppableId={droppableId}>
            {(provided) => (
              <div 
              ref={provided.innerRef} 
              {...provided.droppableProps}>
              <List className={toApplyClasses.root}>
                {orders.map((order) => {
                    return (
                        <OrderItem 
                            handleOnDragItem={this.props.onDragItem}
                            key={order.id} 
                            id={order.id}
                            name={order.name} 
                            userName={order.userName}
                            orderedItems={order.items}
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
          </React.Fragment>
        );
    }
}

OrderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderList);