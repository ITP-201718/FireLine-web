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

export const loginPopupError = (state) => {
    return state.getIn(['loginPopup', 'error'])
}

export const loginPopupErrorMsg = (state) => {
    return state.getIn(['loginPopup', 'errorMsg'])
}

export const autobahnConnectionState = (state) => {
    return useDefault(state.getIn(['autobahn', 'state']), '')
}

//*********************************************
// Profile
//*********************************************
export const profileGetLoggedIn = (state) => {
    return state.getIn(['profile', 'name'])
}

export const profileGetVName = (state) => {
    return useDefault(state.getIn(['profile', 'profile', 'first_name']), 'Unknown')
}

export const profileGetNName = (state) => {
    return useDefault(state.getIn(['profile', 'profile', 'last_name']), 'Unknown')
}

export const profileGetName = (state) => {
    let name = useDefault(profileGetVName(state), '') + ' ' + useDefault(profileGetNName(state), '')
    return name.trim() === '' ? 'Unknown User' : name
}

export const profileGet = (state) => {
    return state.getIn(['profile', 'profile']).toJS()
}

export const profileGetMail = (state) => {
    return useDefault(state.getIn(['profile', 'profile', 'mail']), '')
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

//*********************************************
// User Message
//*********************************************
export const getUserMessageOpen = (state) => {
    return state.getIn(['userMessage', 'open'])
}

export const getUserMessageMessage = (state) => {
    return state.getIn(['userMessage', 'message'])
}

export const getUserMessageCloseDuration = (state) => {
    return state.getIn(['userMessage', 'closeDuration'])
}
