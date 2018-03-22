import { combineReducers } from 'redux-immutable'

import mainWrapper from './mainWrapper'
import routing from './routing'
import profile from './profile'
import loginPopup from './loginPopup'
import autobahn from './autobahn'
import userMessage from './userMessage'

const Reducer = combineReducers({
    mainWrapper,
    routing,
    profile,
    loginPopup,
    autobahn,
    userMessage,
})

export default Reducer