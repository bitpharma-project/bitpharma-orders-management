import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import OrderItem from '../order-item/OrderItem';
import { Droppable } from 'react-beautiful-dnd';
import TitleOrderList from './title-order-list/TitleOrderList';
import styled from 'styled-components';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    margin: '0 auto',
  },
  rootHighlight: {
    width: '100%',
    height: '100%',
    border: 'dashed 1px #14A8C3',
    transition: '0.5s',
    margin: '0 auto',
  },
  inline: {
    display: 'inline',
  },
});

const ListWrapper = styled.div`
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  max-width: 360px;
  margin: 0 auto;
`;

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
              totalItems={ (!!orders)? orders.length : 0}
            />
            <Droppable droppableId={droppableId}>
            {(provided) => (
              <ListWrapper 
                ref={provided.innerRef} 
                {...provided.droppableProps}>
                <List className={toApplyClasses.root}>
                  {(!!orders) ?
                    orders.map((order) => {
                      return (
                          <OrderItem 
                              handleOnDragItem={this.props.onDragItem}
                              key={order.id} 
                              id={order.id}
                              user={order.user}
                              orderedItems={order.products}
                              classes={classes}
                              orderTotal={order.order_total}
                              index={order.id} />
                          );
                      }) : null}
                </List>
                {provided.placeholder}
              </ListWrapper>
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