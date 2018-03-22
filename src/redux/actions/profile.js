import {
    SET_LOGGED_IN,
    PROFILE_SET_USER_NAME,
    PROFILE_SET_USER_MAIL,
    SET_NAVBAR_MENU_OPEN,
    SET_NAVBAR_MENU_ANCHOR_EL,
} from '../names'

export const setLoggedIn = (loggedIn) => {
    return {
        type: SET_LOGGED_IN,
        loggedIn
    }
}

export const setUserName = (name) => {
    return {
        type: PROFILE_SET_USER_NAME,
        name
    }
}

export const setUserMail = (mail) => {
    return {
        type: PROFILE_SET_USER_MAIL,
        mail
    }
}

export const setMenuOpen = (open) => {
    return {
        type: SET_NAVBAR_MENU_OPEN,
        open
    }
}

export const setMenuAnchorEl = (el) => {
    return {
        type: SET_NAVBAR_MENU_ANCHOR_EL,
        el
    }
}