import React, { Children } from 'react'
import {Iterable} from "immutable";
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import Reducers from '../redux/reducers'
import {session} from './Autobahn';

const router_middleware = routerMiddleware(browserHistory)

// Redux Logger
const stateTransformer = (state) => {
    if (Iterable.isIterable(state))
        return state.toJS()
    return state;
}

const reduxLogger = createLogger({
    collapsed: () => true,
    stateTransformer,
})

// Create Redux store
export const store = createStore(
    Reducers,
    composeWithDevTools(applyMiddleware(reduxLogger, router_middleware, thunk.withExtraArgument(session)))
)

const Redux = (props) => {
    return (<Provider store={store}>
        {Children.only(props.children)}
    </Provider>)
}

export default Redux