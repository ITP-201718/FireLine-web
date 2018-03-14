import {
    AUTOBAHN_SET_CONNECTION_STATE,
    AUTOBAHN_CONNECTION_STATE,
} from './names';

export const autobahnConnectionState = AUTOBAHN_CONNECTION_STATE

export const setAutonbahnConnectionState = (state) => {
    return {
        type: AUTOBAHN_SET_CONNECTION_STATE,
        state
    }
}