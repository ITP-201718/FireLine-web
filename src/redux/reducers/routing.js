import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

let initialState = Immutable.fromJS({
    locationBeforeTransitions: null
})

const routing = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.set('locationBeforeTransitions', action.payload);
        default:
            return state
    }
}

export default routing