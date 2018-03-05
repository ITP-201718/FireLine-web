import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';

import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import Reducers from './reducers'
import Routes from './Routes'
import Theme from './theme'
import {Iterable} from "immutable";

const router_middleware = routerMiddleware(browserHistory)

const stateTransformer = (state) => {
    if (Iterable.isIterable(state))
        return state.toJS()
    return state;
}

const reduxLogger = createLogger({
    collapsed: () => true,
    stateTransformer,
})

let store = createStore(
    Reducers,
    composeWithDevTools(applyMiddleware(reduxLogger, router_middleware, thunk))
)

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => {
        return state.get('routing').toJS()
    }
})

ReactDOM.render((
    <Provider store={store}>
        <Theme>
            <Routes history={history}/>
        </Theme>
    </Provider>
), document.getElementById('root'));

//registerServiceWorker();
