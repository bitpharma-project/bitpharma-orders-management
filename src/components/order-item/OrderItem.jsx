import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import MoreVert from '@material-ui/icons/MoreVert';
import { Draggable } from 'react-beautiful-dnd'; // Both at the same time
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { Server } from '../../settings';
class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    }
  }
    render() {
        const {id, orderedItems, user, index, orderTotal} = this.props;
        //let total = 0;
        const useImgUrl = 'https://britz.mcmaster.ca/images/nouserimage.gif/image';
        
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

                            <Card style={{zIndex: '100', width: '100%', margin: '7px'}} key={id} alignItems="flex-start">
                                <CardContent>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <img alt="" src={user.profile_picture_url? `${Server}/${user.profile_picture_url}` : useImgUrl} width="35px" height="35px" style={{borderRadius: '50%'}} />
                                                <div style={{marginLeft: '8px'}}>
                                                    <span style={{fontWeight: '600'}}>{user.first_name} {user.last_name}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <IconButton>
                                                    <MoreVert />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div style={{marginTop: '8px'}}>
                                            <div>
                                             <span style={{fontWeight: '600', fontSize: '0.9rem'}}>Order</span>
                                            </div>
                                            {orderedItems.map((item, index) => {

                                                //total += Number(item.price);

                                                return (
                                                  <ListItem key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                    <div><span>{item.qty} x </span><span style={{color: 'gray'}}>{item.name}</span></div>
                                                    <div>{ item.price}</div>
                                                  </ListItem>
                                                );
                                            })}
                                        </div>
                                        <div style={{ backgroundColor: 'lightgray', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <div><span style={{ fontStyle: 'italic', color: 'darkgray' }}>TOTAL:</span></div>
                                          <div>{ orderTotal }</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                       </div>
                   )}
            </Draggable>
        );
    }
}

export default OrderItem;