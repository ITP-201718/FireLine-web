import Immutable from 'immutable'
import {
    LOGIN_POPUP_SET_NAME,
    LOGIN_POPUP_SET_PW,
    LOGIN_POPUP_SET_OPEN
} from '../actions/names';

function getInitialState() {
    if(true) {
        return Immutable.fromJS({
            name: '',
            pw: '',
            open: false,
        })
    } else {
        return Immutable.fromJS({
            name: 'david',
            pw: 'davidPass',
            open: false,
        })
    }
}

const initialState = getInitialState()

const loginPopup = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_POPUP_SET_NAME:
            return state.set('name', action.name)
        case LOGIN_POPUP_SET_PW:
            return state.set('pw', action.pw)
        case LOGIN_POPUP_SET_OPEN:
            return state.set('open', !!action.open)
        default:
            return state
    }
}

export default loginPopup