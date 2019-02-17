import * as TYPES from './orders-actions-types';
import { INITIAL_STATE as Root } from './orders-initial-state';

export function ordersReducer (orderState = Root, action) {
    let order;

    if (!!action.payload && action.payload.orderId) {
        order = action.payload;
    } else {
        return orderState;
    }

    switch(action.type) {
        case TYPES.NEW_ARRIVED.text:
            return Object.assign({}, orderState, {
                ordersTotal: orderState.ordersTotal + 1,
                orders: orderState.orders.concat(order)
            })

        case TYPES.SET_IN_PROGRESS.text:
        case TYPES.SET_DELIVERED.text:
            let orderTemp = orderState.orders.filter(x => x.orderId === order.orderId)[0];

            if (action.type === TYPES.SET_DELIVERED) {
                orderTemp.stateId = TYPES.SET_DELIVERED.id;
                orderTemp.state = TYPES.SET_DELIVERED.text;
            } else {
                orderTemp.stateId = TYPES.SET_IN_PROGRESS.id;
                orderTemp.state = TYPES.SET_IN_PROGRESS.text;
            }
            
            return Object.assign({}, orderState, {
                orders: orderState.orders.map(o => o.orderId === orderTemp.orderId ? orderTemp : o)
            });

        default:
            return orderState;

    }
}