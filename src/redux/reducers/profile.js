import Immutable from 'immutable'
import {
    SET_LOGGED_IN,
    PROFILE_SET_USER_VNAME,
    PROFILE_SET_USER_NNAME,
    PROFILE_SET_USER_MAIL,
    SET_NAVBAR_MENU_OPEN,
    SET_NAVBAR_MENU_ANCHOR_EL, PROFILE_SET
} from '../names';

function getInitialState() {
    if(!!window.FIRELINE_DEBUG) {
        const AUTO_LOGGED_IN = true;
        return Immutable.fromJS({
            loggedIn: AUTO_LOGGED_IN,
            profile: {
                first_name: AUTO_LOGGED_IN ? "David" : null,
                last_name: AUTO_LOGGED_IN ? "Langheiter" : null,
                mail: AUTO_LOGGED_IN ? "david@langheiter.com" : null,
            },
            menuOpen: false,
            anchorElMenu: null,
        });
    } else {
        return Immutable.fromJS({
            loggedIn: false,
            profile: {
                first_name: '',
                last_name: '',
                mail: '',
            },
            menuOpen: false,
            anchorElMenu: null,
        })
    }
}

const initialState = getInitialState()

const profile = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGGED_IN:
            return state.set('loggedIn', !!action.loggedIn);
        case PROFILE_SET:
            const curState = state.get('profile').toJS()
            const newState = {...curState, ...action.profile}
            return state.set('profile', Immutable.fromJS(newState))
        case PROFILE_SET_USER_VNAME:
            return state.setIn(['profile', 'first_name'], action.vname)
        case PROFILE_SET_USER_NNAME:
            return state.setIn(['profile', 'last_name'], action.nname)
        case PROFILE_SET_USER_MAIL:
            return state.setIn(['profile', 'mail'], action.mail)
        case SET_NAVBAR_MENU_OPEN:
            return state.set('menuOpen', action.open)
        case SET_NAVBAR_MENU_ANCHOR_EL:
            return state.set('anchorElMenu', action.el)
        default:
            return state
    }
}

export default profile