import Immutable from 'immutable'
import {
    LOCATION_CHANGE
} from 'react-router-redux'

const initialState = Immutable.fromJS({
    locationBeforeTransition: null
})

const routeReducer = (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransition', action.payload)
    }

    return state
}

export default routeReducer