import autobahn from 'autobahn'
import {store} from './Redux';
import {
    setAutonbahnConnectionState,
    autobahnConnectionState
} from '../redux/actions/autobahn';
import {setLoggedIn, setUserProfile} from '../redux/actions/profile';

export const baseUri = 'io.fireline.api.'
export let session = null;
let connection = null

// TODO: remove debugging
const DEBUGGING = true

const getUrl = () => {
    if (DEBUGGING)
        return 'wss://david.fireline.io/api'
    const host = window.location.hostname
    return 'wss://' + host + '/api'
}

const setState = (state) => {
    store.dispatch(setAutonbahnConnectionState(state))
}

const errorIfNotConnected = () => {
    if (!session)
        throw new Error('Autobahn not connected')
}

const subscriptions = {}
const procedures = {}

export const isConnected = () => {
    if (connection && session) {
        return connection.isOpen
    }
    return false
}

// Base Functions

export const publish = (topic, args, kwargs, options) => {
    errorIfNotConnected()
    return session.publish(baseUri + topic, args, kwargs, options)
}

export const subscribe = async (topic, handler, options) => {
    errorIfNotConnected()
    topic = baseUri + topic
    if (!(topic in subscriptions)) {
        subscriptions[topic] = []
    }
    const subscription = session.subscribe(topic, handler, options)
    subscriptions[topic].push(subscription)
    return subscription
}

export const unsubscribe = async (subscription) => {
    if (typeof subscription === 'string') {
        subscription = subscriptions[baseUri + subscription]
    } else if (!Array.isArray(subscription)) {
        subscription = [subscription]
    }

    await Promise.all(subscription.map(async (cur) => {
        await session.unsubscribe(cur)
    }))
}

export const call = (procedure, args = null, kwargs = null, options = null) => {
    errorIfNotConnected()
    return session.call(baseUri + procedure, args, kwargs, options)
}

export const register = async (procedure, endpoint, options = null) => {
    errorIfNotConnected()
    if (!(procedure in procedures)) {
        procedures[procedure] = [];
    }
    const proc = await session.register(procedure, endpoint, options)
    procedures[procedure].push(proc)
    return proc
}

const authSuccessful = () => {
    setState(autobahnConnectionState.connected)
    store.dispatch(setLoggedIn(true))
    callOnConnect()

    call('profile.get').then((res) => {
        store.dispatch(setUserProfile(res))
    })
}

export const tryCookieAuth = (onOpen) => {
    connection = new autobahn.Connection({
        url: getUrl(),
        realm: 'fireline',
        authmethods: ['cookie'],
    })

    connection.onopen = (_session, details) => {
        session = _session
        authSuccessful()
        if (typeof onOpen === 'function')
            onOpen(session, details)
    }

    connection.onclose = () => {
        setState(autobahnConnectionState.disconnected)
        return true
    }

    connection.open()
    setState(autobahnConnectionState.connecting)
}

export const tryUserAuth = async (user, pw) => {
    return new Promise((resolve, reject) => {
        const onChallenge = (session, method, extra) => {
            if (method === 'ticket') {
                return pw
            } else {
                throw Error('don\'t know how to authenticate using \'' + method + '\'');
            }
        }

        connection = new autobahn.Connection({
            url: getUrl(),
            realm: 'fireline',
            authmethods: ['ticket'],
            authid: user,
            onchallenge: onChallenge,
        })

        connection.onopen = (_session, details) => {
            session = _session
            authSuccessful()
            resolve({session: _session, details})
        }

        connection.onclose = (reason, details) => {
            setState(autobahnConnectionState.disconnected)
            reject({reason, details})
            return true
        }

        connection.open()
        setState(autobahnConnectionState.connecting)
    })
}

/*export const connectToWs = (user, pw, onOpen, onClose) => {

    tryUserAuth(user, pw)
        .then(res => {
            if (typeof onOpen === 'function')
                onOpen(res.session, res.details)
        })
        .catch(res => {
            if (typeof onClose === 'function')
                onClose(res.session, res.details)
        })
}*/

export const getUserErrorMessage = (reason, details) => {
    if (typeof reason === 'object') {
        details = reason.details
        reason = reason.reason
    }
    switch (reason) {
        case 'unreachable':
            return 'Server not reachable'
        case 'unsupported':
            return 'Network error'
        case 'lost':
        case 'closed':
            if (details.reason.startsWith('io.fireline.error'))
                return details.message
            else
                console.error(details.message)
            return 'Internal server error'
        default:
            console.error(reason, details)
            return 'Unknown Error'
    }
}

export const disconnectWs = (reason="wamp.close.logout", details) => {
    setState(autobahnConnectionState.disconnected)
    if (connection) {
        connection.close(reason, details)
    }
    connection = null
    session = null
}

let onConnectCall = {}

/**
 * @param {function} func Function to be called when autobahn connects
 */
export const registerOnConnect = (func) => {
    if (!(func && {}.toString.call(func) === '[object Function]')) {
        throw new Error("The 'func' supplied was not an function.")
    }
    const uid = '_' + Math.random().toString(36).substr(2, 9);
    onConnectCall[uid] = func
}

export const unregisterOnConnect = (uid) => {
    if(uid in onConnectCall) {
        delete onConnectCall[uid]
        return true
    }
    return false
}

const callOnConnect = () => {
    for(const uid in onConnectCall) {
        onConnectCall[uid]()
        unregisterOnConnect(uid)
    }
}