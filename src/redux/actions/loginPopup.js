import {
    LOGIN_POPUP_SET_NAME,
    LOGIN_POPUP_SET_PW,
    LOGIN_POPUP_SET_OPEN, LOGIN_POPUP_SET_ERROR, LOGIN_POPUP_SET_ERROR_MSG,
} from '../names';

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

export const loginPopupSetError = (error) => {
    return {
        type: LOGIN_POPUP_SET_ERROR,
        error
    }
}

export const loginPopupSetErrorMsg = (msg) => {
    return {
        type: LOGIN_POPUP_SET_ERROR_MSG,
        msg
    }
}