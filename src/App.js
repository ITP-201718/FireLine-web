import React, { Component } from 'react';
import 'typeface-roboto'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import NavBar from './containers/NavBar'
import Reducer from './reducers'
import { Router, Route } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createBrowserHistory from 'history/createBrowserHistory'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff624b',
            main: '#E52620',
            dark: '#aa0000',
        },
        secondary: {
            ligth: '#ffffff',
            main: '#efefef',
            dark: '#bdbdbd',
        }
    }
});

const browserHistory = createBrowserHistory()
const middleware = routerMiddleware(browserHistory)

const store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(middleware),
    applyMiddleware(thunk),
);

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
})

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <Router history={history}>
                        <Route path="/">
                            <NavBar/>
                        </Route>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

export default App;
