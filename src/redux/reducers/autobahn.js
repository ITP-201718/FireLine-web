import Immutable from 'immutable'
import {
    AUTOBAHN_SET_CONNECTION_STATE,
    AUTOBAHN_CONNECTION_STATES,
} from '../names';

const initialState = Immutable.fromJS({
    state: AUTOBAHN_CONNECTION_STATES.disconnected,
})

const autobahn = (state = initialState, action) => {
    switch(action.type) {
        case AUTOBAHN_SET_CONNECTION_STATE:
            if(Object.values(AUTOBAHN_CONNECTION_STATES).includes(action.state)) {
                return state.set('state', action.state)
            }
            break;
        default:
            break;
    }
    return state
}

export default autobahn