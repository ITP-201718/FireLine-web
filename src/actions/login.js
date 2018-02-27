import {
    TOGGLE_LOGIN,
    SET_USER_NAME,
    SET_USER_IMG_PATH
} from './names'

export const toggleLogin = () => {
    return {
        type: TOGGLE_LOGIN
    }
}

export const setUserName = (name) => {
    return {
        type: SET_USER_NAME,
        name
    }
}

export const setUserImgPath = (path) => {
    return {
        type: SET_USER_IMG_PATH,
        path
    }
}