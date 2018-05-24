import React from 'react'
import MainWrapper from '../components/MainWrapper';
import Main from '../pages/Main/Main';
import Profile from '../pages/profile';
import Default from '../components/route_test/Default';
import {store} from './Redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, browserHistory} from 'react-router';
import AddUser from '../pages/add_user'
import Ausbildung from '../pages/ausbildung'
import Rang from '../pages/rang'
import Aktivitaet from '../pages/aktivitaet'
import Berechtigung from '../pages/berechtigung'
import Freigabe from '../pages/freigabe'
import Zbereich from '../pages/zbereich'
import Einsatz from '../pages/einsatz'
import Geraetegrp from '../pages/gerategrp'
import Fahrzeug from '../pages/fahrzeug'

import Mitglied, {AddMitglied, EditMitglied} from '../pages/mitglied'

const routes = {
    path: '/',
    component: MainWrapper,
    indexRoute: {component: Main},
    childRoutes: [
        {path: 'profile', component: Profile},
        {path: 'add_user', component: AddUser},
        {path: 'ausbildung', component: Ausbildung},
        {
            path: 'mitglied',
            indexRoute: {component: Mitglied},
            childRoutes: [
                {path: 'add', component: AddMitglied},
                {path: 'edit/:id', component: EditMitglied},
            ],
        },
        {path: 'rang', component: Rang},
        {path: 'aktivitaet', component: Aktivitaet},
        {path: 'berechtigung', component: Berechtigung},
        {path: 'freigabe', component: Freigabe},
        {path: 'zbereich', component: Zbereich},
        {path: 'einsatz', component: Einsatz},
        {path: 'geraetegrp', component: Geraetegrp},
        {path: 'fahrzeug', component: Fahrzeug},
        {path: ':pageName', component: Default},
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
        return (<Router history={history} routes={routes}/>)
    }
}

export default Routes