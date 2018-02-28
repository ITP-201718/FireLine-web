import Immutable from 'immutable'
import {
    SET_LOGGED_IN,
    SET_USER_NAME,
    SET_USER_IMG_PATH,
    SET_NAVBAR_MENU_OPEN,
    SET_NAVBAR_MENU_ANCHOR_EL
} from '../actions/names';

const  initialState = Immutable.fromJS({
    loggedIn: false,
    name: null,
    imgPath: null,
    menuOpen: false,
    anchorElMenu: null,
});

const profile = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGGED_IN:
            return state.set('loggedIn', !!action.loggedIn);
        case SET_USER_NAME:
            return state.set('name', action.name)
        case SET_USER_IMG_PATH:
            return state.set('imgPath', action.path)
        case SET_NAVBAR_MENU_OPEN:
            return state.set('menuOpen', action.open)
        case SET_NAVBAR_MENU_ANCHOR_EL:
            return state.set('anchorElMenu', action.el)
        default:
            return state;
    }
}

export default profile