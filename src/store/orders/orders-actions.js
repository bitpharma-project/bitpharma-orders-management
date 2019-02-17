import * as TYPES from './orders-actions-types';

// This is an action creator only

export function setInProgress(payload) {
    return {
        type: TYPES.SET_IN_PROGRESS,
        payload: payload
    }
}

export function setDelivered(payload) {
    return {
        type: TYPES.SET_DELIVERED,
        payload: payload
    }
}

export function newArrived(payload) {
    return {
        type: TYPES.NEW_ARRIVED,
        payload: payload
    }
}