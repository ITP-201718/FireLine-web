import md5 from 'md5'

//*********************************************
// Helpers
//*********************************************
const useDefault = (value, def, allowNull = false) => {
    if(allowNull)
        return value === undefined ? def : value
    return value === undefined || value === null ? def : value
}

//*********************************************
// Login Popup
//*********************************************
export const loginPopupGetName = (state) => {
    return state.getIn(['loginPopup', 'name'])
}

export const loginPopupGetPw = (state) => {
    return state.getIn(['loginPopup', 'pw'])
}

export const loginPopupIsOpen = (state) => {
    return state.getIn(['loginPopup', 'open'])
}

export const autobahnConnectionState = (state) => {
    return state.getIn(['autobahn', 'state'])
}

//*********************************************
// Profile
//*********************************************
export const profileGetLoggedIn = (state) => {
    return state.getIn(['profile', 'name'])
}

export const profileGetName = (state) => {
    return useDefault(state.getIn(['profile', 'name']), 'Unknown')
}

export const profileGetMail = (state) => {
    return useDefault(state.getIn(['profile', 'mail']), '')
}

export const profileMd5Hash = (state) => {
    return md5(profileGetMail(state).toLowerCase())
}

export const profileGetMenuOpen = (state) => {
    return state.getIn(['profile', 'menuOpen'])
}

export const profileGetAnchorElMenu = (state) => {
    return state.getIn(['profile', 'anchorElMenu'])
}