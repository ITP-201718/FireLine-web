import Immutable from 'immutable'
import {
    LOGIN_POPUP_SET_NAME,
    LOGIN_POPUP_SET_PW,
    LOGIN_POPUP_SET_OPEN,
    LOGIN_POPUP_SET_ERROR,
    LOGIN_POPUP_SET_ERROR_MSG,
} from '../names';

function getInitialState() {
    // TODO: Remove debug
    if(window.FIRELINE_DEBUG) {
        return Immutable.fromJS({
            name: 'david',
            pw: 'davidPass',
            open: false,
            error: false,
            errorMsg: '',
        })
    } else {
        return Immutable.fromJS({
            name: '',
            pw: '',
            open: false,
            error: false,
            errorMsg: '',
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
        case LOGIN_POPUP_SET_ERROR:
            return state.set('error', !!action.error)
        case LOGIN_POPUP_SET_ERROR_MSG:
            return state.set('errorMsg', action.msg)
        default:
            return state
    }
}

export default loginPopup