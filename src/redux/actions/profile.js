import {
    SET_LOGGED_IN,
    PROFILE_SET,
    PROFILE_SET_USER_VNAME,
    PROFILE_SET_USER_NNAME,
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

export const setUserProfile = (profile) => {
    return {
        type: PROFILE_SET,
        profile,
    }
}

export const setUserVName = (vname) => {
    return {
        type: PROFILE_SET_USER_VNAME,
        vname
    }
}

export const setUserNName = (nname) => {
    return {
        type: PROFILE_SET_USER_NNAME,
        nname
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