import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import OrderList from '../order-list/OrderList';
import { DragDropContext } from 'react-beautiful-dnd';
import { CircularProgress } from '@material-ui/core';
import Navbar from '../navbar/Navbar';
import ActionCable from 'actioncable';
import { withCookies } from 'react-cookie';
import BitModal from '../bit-modal/BitModal';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import withAPI from '../../utils/withAPI';
import { WSConnection } from '../../settings';
import { NOTIFICATION_TYPES } from '../../constants/NotificationTypes';
import OrderInfoContent from './OrderInfoContent/OrderInfoContent';
import styled from 'styled-components';
require('babel-polyfill');

const GridWrapper = styled.div`
  width: 100%;
  height: calc(100% - 48px);
  margin-top: 64px;
`;

const BitModalWrapper = styled(BitModal)`
  width: calc(100vw - 30%);
  height: calc(100vh - 30%);
  @media only screen and (max-width: 768px) {
    width: calc(100vw - 20%);
    height: calc(100vh - 20%);
  }
  @media only screen and (max-width: 48px) {
    width: 100vw;
    height: 100vh;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  margin-top: 10%;
  height: auto;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    & > svg {
      color: #5639ac;
    }
  }
`;

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColumnHighLight: [false, false, false],
      columnsData: [
        [], [], []
      ],
      isLoading: true,
      openOrderInfo: false,
      orderInfo: {
        user: {},
        data: {}
      }
    };
    this.API = this.props.API;
    this.cable = null;
  }

  handleDragEnd = (event) => {
      const { columnsData, showColumnHighLight } = this.state;

      let destination = event.destination;
      let source = event.source;
      let itemId = event.draggableId;

      if ( (!!destination && !!source)) {

        if (destination.droppableId !== source.droppableId) {
          // Old data values
          let newOrders = columnsData[0];
          let progressOrders = columnsData[1];
          let deliveredOrders = columnsData[2];

          //Get destinatino column
          let destColumnId = parseInt(destination.droppableId);
          let destColumn = columnsData[destColumnId-1];

          //Get source column
          let sourceColumnId = parseInt(source.droppableId);
          let sourceColumn = columnsData[sourceColumnId-1];

          //Get dragged item
          let item = columnsData[sourceColumnId-1].filter(x => x.id === itemId)[0];

          destColumn.push(item);
          // Get index of item in list
          let idx = sourceColumn.indexOf(item);
          sourceColumn = sourceColumn.splice(idx, 1);

          columnsData[0] = newOrders;
          columnsData[1] = progressOrders;
          columnsData[2] = deliveredOrders;

          let newState = 'new';
          if (destColumnId === 2) newState = 'progress';
          if (destColumnId === 3) newState = 'delivered';

          this.API.patch('/order', {
            order_id: itemId,
            state: newState,
            drugstore_id: 2
          }).then(data => {
            this.setState({
              columnsData: columnsData
            }, () => {
              this.props.addNotification(
                "Success",
                "Order was updated successfully!",
                2000,
                NOTIFICATION_TYPES.SUCCESS
              );
            }, err => {
              this.props.addNotification(
                ":( Oh no!",
                "If the problem persists, please contact your administrator.",
                2000,
                NOTIFICATION_TYPES.ERROR
              );
            });
          })
        } else {
          console.log('Item dropped in same column, no action needed.');
        }
      } else {
        console.log('Source and destination cannot be null.');
      }

      showColumnHighLight[0] = false;
      showColumnHighLight[1] = false;
      showColumnHighLight[2] = false;

      this.setState({
          showColumnHighLight: showColumnHighLight
      });

  }

  handleDragStart = (event) => {
      /** Highlith next column border */
      const { showColumnHighLight } = this.state;
      let columnId = event.source.droppableId;
      showColumnHighLight[columnId] = true; // WARNING: this starts from zero

      if(columnId === 3) {
        showColumnHighLight[columnId] = false;
        showColumnHighLight[columnId-2] = true;
      }

      console.log('DRAG START >>>>>');
      console.log(showColumnHighLight);

      this.setState({
          showColumnHighLight: showColumnHighLight
      });
  }

  componentWillMount = () => {
    this.cable = ActionCable.createConsumer(`${WSConnection}/cable`);
  }

  componentDidMount = () => {
    this.getColumnsData();
  }

  getColumnsData() {
    const { columnsData } = this.state;

    this.setState({
      isLoading: true,
    }, async () => {
      let news = await this.API.get(`/order/all?status=new&drugstore_id=2`);
      let progress = await this.API.get(`/order/all?status=progress&drugstore_id=2`);
      let delivered = await this.API.get(`/order/all?status=delivered&drugstore_id=2`);

      columnsData[0] = this.orderWithTotals(news.data);
      columnsData[1] = this.orderWithTotals(progress.data);
      columnsData[2] = this.orderWithTotals(delivered.data);

      console.log(columnsData);

      this.setState({
        columnsData: columnsData,
        isLoading: false,
      });
    });
  }

  orderWithTotals = (orders) => {
    let result = orders.map((order) => {
      let total = 0;
      for(let i = 0; i < order.products.length; i++) {
        total += Number(order.products[i].price)
      }
      return {
        ...order,
        order_total: total
      }
    });

    return result;
  }

  handleReceived = (message) => {
      const response = message;
      const { columnsData } = this.state;

      console.log('RECEIVE DATA >>>>', message);

      if (!!response && !!response.orders_new && !!response.orders_progress && !!response.orders_delivery) {
        columnsData[0] = this.orderWithTotals(response.orders_new);
        columnsData[1] = this.orderWithTotals(response.orders_progress);
        columnsData[2] = this.orderWithTotals(response.orders_delivery);

        this.setState({
          columnsData: columnsData
        });
      }
  }

  showOrderInfo = (user) => {
    this.setState({
      openOrderInfo: true,
      orderInfo: {
        user: user,
        data: {}
      }
    }, () => {
      console.log(user);
    });
  }

  handleOrderInfoClose = () => {
    this.setState({
      openOrderInfo: false,
      orderInfo: {
        user: {},
        data: {}
      }
    });
  }

  render() {
    const { columnsData, showColumnHighLight, isLoading, openOrderInfo, orderInfo } = this.state;
    let newsId = 1;
    let progressId = 2;
    let deliveredId = 3;

    if (isLoading) {
      return (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      );
    }

    return (
      <>
        <ActionCableProvider cable={this.cable}>
          <ActionCableConsumer
            channel="OrderNotificationChannel"
            onReceived={this.handleReceived}
          />
          <DragDropContext onDragEnd={this.handleDragEnd} onDragStart={this.handleDragStart}>
              <GridWrapper>
                  <Grid container>
                      <Grid item xs={4}>
                        <OrderList 
                          title="Incoming"
                          showHighlight={showColumnHighLight[0]}
                          droppableId={newsId}
                          onDragItem={this.handleDrag}
                          orders={columnsData[newsId-1]}
                          showOrderInfo={this.showOrderInfo} />
                      </Grid>
                      <Grid item xs={4}>
                        <OrderList
                          title="In Progress"
                          showHighlight={showColumnHighLight[1]}
                          droppableId={progressId}
                          onDragItem={this.handleDrag}
                          orders={columnsData[progressId-1]}
                          showOrderInfo={this.showOrderInfo} />
                      </Grid>
                      <Grid item xs={4}>
                        <OrderList 
                          title="Delivered"
                          showHighlight={showColumnHighLight[2]}
                          droppableId={deliveredId}
                          onDragItem={this.handleDrag}
                          orders={columnsData[deliveredId-1]}
                          showOrderInfo={this.showOrderInfo} />   
                      </Grid>
                  </Grid>
              </GridWrapper>
          </DragDropContext>
        </ActionCableProvider>
        <BitModalWrapper
          open={openOrderInfo}
          title="Order title"
          description="Order info"
          handleClose={this.handleOrderInfoClose}
        >
          <OrderInfoContent
            handleClose={this.handleOrderInfoClose}
            orderInfo={orderInfo}
          />
        </BitModalWrapper>
      </>
    );
  }
}

export default withCookies(withAPI(Orders));