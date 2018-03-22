import Immutable from 'immutable'
import {
    MAIN_WRAPPER_SET_DRAWER_OPEN
} from '../names';

const initialState = Immutable.fromJS({
    open: false,
})

const mainWrapper = (state = initialState, action) => {
    switch(action.type) {
        case MAIN_WRAPPER_SET_DRAWER_OPEN:
            return state.set('open', action.open)
        default:
            return state
    }
}

export default mainWrapper