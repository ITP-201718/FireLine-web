import {
    USERMESSAGE_SET_OPEN,
    USERMESSAGE_SET_MESSAGE, USERMESSAGE_SET_CLOSE_DURATION,
} from '../names';

export const setUserMessageOpen = (open) => {
    return {
        type: USERMESSAGE_SET_OPEN,
        open
    }
}

export const setUserMessageMessage = (message) => {
    return {
        type: USERMESSAGE_SET_MESSAGE,
        message
    }
}

export const setUserMessageCloseDuration = (duration) => {
    return {
        type: USERMESSAGE_SET_CLOSE_DURATION,
        duration
    }
}
