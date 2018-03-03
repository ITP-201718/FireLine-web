import React from 'react'
import { IndexRoute, Router, Route } from 'react-router'

import MainWrapper from './components/MainWrapper'
import Main from './components/route_test/Main'
import Account from './components/route_test/Account'
import Default from './components/route_test/Default'

const Routes = (props) => (
    <Router history={props.history}>
        <Route path="/" component={MainWrapper}>
            <IndexRoute component={Main}/>
            <Route path="account" component={Account} />
            <Route path="/:pageName" component={Default} />
        </Route>
    </Router>
)

export default Routes