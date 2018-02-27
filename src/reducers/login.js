import {
    TOGGLE_LOGIN,
    SET_USER_NAME,
    SET_USER_IMG_PATH
} from '../actions/names';
import Immutable from 'immutable'

const  initialState = Immutable.fromJS({
    loggedIn: false,
    name: null,
    imgPath: null,
});

const login = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_LOGIN:
            return state.set('loggedIn', !state.get('loggedIn'));
        case SET_USER_NAME:
            return state.set('name', action.name)
        case SET_USER_IMG_PATH:
            return state.set('imgPath', action.path)
        default:
            return state;
    }
}

export default login