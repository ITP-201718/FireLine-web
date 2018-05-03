import React from 'react'
import MainWrapper from '../components/MainWrapper';
import Main from '../components/route_test/Main';
import Profile from '../pages/profile';
import Default from '../components/route_test/Default';
import {store} from './Redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, browserHistory} from 'react-router';
import AddUser from '../pages/add_user'
import AddMitglied from '../pages/add_mitglied'

const routes = {
    path: '/',
    component: MainWrapper,
    indexRoute: { component: Main},
    childRoutes: [
        { path: 'profile', component: Profile },
        { path: 'add_user', component: AddUser },
        { path: 'add_mitglied', component: AddMitglied },
        { path: ':pageName', component: Default },
    ]
}

// Create history redux sync
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => {
        return state.get('routing').toJS()
    }
})

class Routes extends React.Component {
    render = () => {
        return (<Router history={history} routes={routes} />)
    }
}

export default Routes