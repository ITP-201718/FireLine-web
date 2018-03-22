import Immutable from 'immutable'
import {
    USERMESSAGE_SET_OPEN,
    USERMESSAGE_SET_MESSAGE,
    USERMESSAGE_SET_CLOSE_DURATION,
} from '../names';

const initialState = Immutable.fromJS({
    open: false,
    message: '',
    closeDuration: 6000,
})

const userMessage = (state = initialState, action) => {
    switch(action.type) {
        case USERMESSAGE_SET_OPEN:
            return state.set('open', action.open)
        case USERMESSAGE_SET_MESSAGE:
            return state.set('message', action.message)
        case USERMESSAGE_SET_CLOSE_DURATION:
            return state.set('closeDuration', action.duration)
        default:
            return state
    }
}

export default userMessage