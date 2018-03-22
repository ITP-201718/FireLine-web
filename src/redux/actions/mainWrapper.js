import {
    MAIN_WRAPPER_SET_DRAWER_OPEN
} from '../names';

export const setDrawerOpen = (open) => {
    return {
        type: MAIN_WRAPPER_SET_DRAWER_OPEN,
        open,
    }
}