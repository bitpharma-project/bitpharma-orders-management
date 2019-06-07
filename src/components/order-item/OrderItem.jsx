import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import MoreVert from '@material-ui/icons/MoreVert';
import { Draggable } from 'react-beautiful-dnd'; // Both at the same time
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { Server } from '../../settings';

const UserPhotoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const Username = styled.div`
  & > span {
    font-weight: 400;
    font-size: 1.08rem;
  }
  margin-left: 12px;
`;

const PossibleLongTextFormatter = (text) => {
  if (text.length > 22) {
    let cutted = text.substr(0, 22);
    cutted = cutted + "..."
    return  cutted;
  }
  return text;
}
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

                            <Card style={{zIndex: '100', width: '100%', margin: '7px', alignItems: 'flex-start'}} key={id}>
                                <CardContent>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <UserPhotoWrapper>
                                                  <UserImage alt={user.email} src={user.profile_picture_url? `${Server}/${user.profile_picture_url}` : useImgUrl} />
                                                  <Username>
                                                    <span>
                                                      { PossibleLongTextFormatter(user.complete_name) }
                                                    </span>
                                                  </Username>
                                                </UserPhotoWrapper>
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
                                                    <div>
                                                      <span>
                                                        {`${item.qty} x `}
                                                      </span>
                                                      <span style={{color: 'gray'}}>
                                                        {PossibleLongTextFormatter(item.name)}
                                                      </span>
                                                    </div>
                                                    <div>{ Math.round(item.price * 100) / 100 }</div>
                                                  </ListItem>
                                                );
                                            })}
                                        </div>
                                        <div style={{ backgroundColor: 'lightgray', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <div><span style={{ fontStyle: 'italic', color: 'darkgray' }}>TOTAL:</span></div>
                                          <div>{ Math.round(orderTotal * 100) / 100 }</div>
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