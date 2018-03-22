import {
    AUTOBAHN_SET_CONNECTION_STATE,
    AUTOBAHN_CONNECTION_STATES,
} from '../names';

export const autobahnConnectionState = AUTOBAHN_CONNECTION_STATES

export const setAutonbahnConnectionState = (state) => {
    return {
        type: AUTOBAHN_SET_CONNECTION_STATE,
        state
    }
}