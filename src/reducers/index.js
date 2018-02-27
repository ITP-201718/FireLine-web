import { combineReducers } from 'redux-immutable'
import login from './login'
import routing from './routing'

const reducers = combineReducers({
    login,
    routing
});

export default reducers