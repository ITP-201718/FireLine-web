import Immutable from 'immutable'
import {
    SET_DRAWER_OPEN
} from '../actions/names';

const initialState = Immutable.fromJS({
    open: false,
})

const mainWrapper = (state = initialState, action) => {
    switch(action.type) {
        case SET_DRAWER_OPEN:
            return state.set('open', action.open)
        default:
            return state
    }
}

export default mainWrapper