import { combineReducers } from 'redux-immutable'

import mainWrapper from './mainWrapper'
import routing from './routing'
import profile from './profile'

const Reducer = combineReducers({
    mainWrapper,
    routing,
    profile,
})

export default Reducer