import {
    LOGIN_POPUP_SET_NAME,
    LOGIN_POPUP_SET_PW,
    LOGIN_POPUP_SET_OPEN,
} from './names';

export const loginPopupSetName = (name) => {
    return {
        type: LOGIN_POPUP_SET_NAME,
        name
    }
}

export const loginPopupSetPw = (pw) => {
    return {
        type: LOGIN_POPUP_SET_PW,
        pw
    }
}

export const loginPopupSetOpen = (open) => {
    return {
        type: LOGIN_POPUP_SET_OPEN,
        open
    }
}