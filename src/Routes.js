import React from 'react'
import { IndexRoute, Router, Route } from 'react-router'

import MainWrapper from './components/MainWrapper'
import Main from './components/route_test/Main'
import Account from './components/route_test/Account'

const Routes = (props) => (
    <Router history={props.history}>
        <Route path="/" component={MainWrapper}>
            <IndexRoute component={Main}/>
            <Route path="account" component={Account} />
        </Route>
    </Router>
)

export default Routes