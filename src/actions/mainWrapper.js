import {
    SET_DRAWER_OPEN
} from './names';

export const setDrawerOpen = (open) => {
    return {
        type: SET_DRAWER_OPEN,
        open,
    }
}