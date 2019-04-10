import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OrderList from '../order-list/OrderList';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../navbar/Navbar';
import ActionCable from 'actioncable';
import { withCookies } from 'react-cookie';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import axios from 'axios';
import { ApiServer, WSConnection } from '../../settings';
import { NOTIFICATION_TYPES } from '../../constants/NotificationTypes';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    titleText: {
        fontFamily: 'Open Sans, sans-serif'
    }
});

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showColumnHighLight: [false, false, false],
            columnsData: [
              [], [], []
            ],
            isLoading: true,
            user: {
              complete_name: '',
              imgUrl: '',
              email: '',
            }
        };
        this.axiosInstance = axios.create({
          baseURL: ApiServer,
          timeout: 15000,
          headers: {
            'Authorization': `Bearer ${this.props.cookies.get('token', { path: '/' })}`,
            'Content-Type': 'application/json'
          }
        });
    }

    handleDragEnd = (event) => {
        const { columnsData, showColumnHighLight } = this.state;

        let destination = event.destination;
        let source = event.source;
        let itemId = event.draggableId;

        if(!!destination && !!source) {

            // Old data values
            let newOrders = columnsData[0];
            let progressOrders = columnsData[1];
            let deliveredOrders = columnsData[2];

            //Get destinatino column
            let destColumnId = destination.droppableId;
            let destColumn = columnsData[destColumnId-1];

            //Get source column
            let sourceColumnId = source.droppableId;
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

            console.log(destColumnId);

            this.axiosInstance.patch('/order', {
              order_id: itemId,
              state: newState
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

        this.setState({
            showColumnHighLight: showColumnHighLight
        });
    }

    componentDidMount = () => {
      //Show action cable
      console.log('------- Action cable');
      console.log(this.props.cable);
      this.axiosInstance.get('/user').then(data => {
        this.setState({
          user: {
            complete_name: data.data.complete_name,
            email: data.data.email,
            imgUrl: data.data.profile_picture_url,
          }
        });
      });
      this.getColumnsData();
    }

    async getColumnsData() {
      const { columnsData } = this.state;
      let news = await this.axiosInstance.get(`/order/all?status=new`);
      let progress = await this.axiosInstance.get(`/order/all?status=progress`);
      let delivered = await this.axiosInstance.get(`/order/all?status=delivered`);

      columnsData[0] = news.data;
      columnsData[1] = progress.data;
      columnsData[2] = delivered.data;

      this.setState({
        columnsData: columnsData
      });
    }

    handleReceived = (message) => {
        const response = message;
        const { columnsData } = this.state;
        columnsData[0] = response.orders_new;
        columnsData[1] = response.orders_progress;
        columnsData[2] = response.orders_delivery;
         console.log(message)
        this.setState({
          columnsData: columnsData
        });
    }

    handleLogout = (e) => {
      this.props.handleLoginLogout(e);
    }

    render() {
        const { classes, cookies } = this.props;
        const { columnsData, showColumnHighLight, user } = this.state;
        let newsId = 1;
        let progressId = 2;
        let deliveredId = 3;
        this.cable = ActionCable.createConsumer(`${WSConnection}/cable`)

        return (
            <div>
                <Navbar handleLogout={this.handleLogout} user={user} cookies={cookies} />
                <DragDropContext onDragEnd={this.handleDragEnd} onDragStart={this.handleDragStart}>
                    <div className={classes.root}>
                        <Grid container>
                            <Grid item xs={4}>

        <ActionCableProvider cable={this.cable}>
          <ActionCableConsumer
            channel="OrderNotificationChannel"
            onReceived={this.handleReceived}
          />
                                <OrderList 
                                    title="Incoming"
                                    showHighlight={showColumnHighLight[0]}
                                    droppableId={newsId}
                                    onDragItem={this.handleDrag}
                                    orders={columnsData[newsId-1]} />

            </ActionCableProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <OrderList
                                    title="In Progress"
                                    showHighlight={showColumnHighLight[1]}
                                    droppableId={progressId}
                                    onDragItem={this.handleDrag}
                                    orders={columnsData[progressId-1]} />
                            </Grid>
                            <Grid item xs={4}>
                                <OrderList 
                                    title="Delivered"
                                    showHighlight={showColumnHighLight[2]}
                                    droppableId={deliveredId}
                                    onDragItem={this.handleDrag}
                                    orders={columnsData[deliveredId-1]} />   
                            </Grid>
                        </Grid>
                    </div>
                </DragDropContext>
            </div>
        );
    }
}

export default withStyles(styles)(withCookies(Orders));