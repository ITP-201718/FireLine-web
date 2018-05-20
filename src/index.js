import React from 'react'
import ReactDOM from 'react-dom';
import './general/index.css'

import 'regenerator-runtime/runtime'
import Redux from './general/Redux'
import Theme from './general/Theme'
import Routes from './general/Routes'
import MainWrapper from './components/MainWrapper'
import Main from './components/route_test/Main'


import {tryCookieAuth} from './general/Autobahn';

ReactDOM.render((
    <Redux>
        <Theme>
            <Routes routeCompenent={MainWrapper} indexRouteComponent={Main} />
        </Theme>
    </Redux>
), document.getElementById('root'));

tryCookieAuth(() => {console.log('cookie auth')})