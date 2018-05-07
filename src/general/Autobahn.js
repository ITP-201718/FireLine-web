import autobahn from 'autobahn'
import { store } from './Redux';
import {
    setAutonbahnConnectionState,
    autobahnConnectionState
} from '../redux/actions/autobahn';

export const baseUri = 'io.fireline.api.'
export let session = null;
let connection = null

const DEBUGGING = true

const getUrl = () => {
    if(DEBUGGING)
        return "wss://david.fireline.io/api"
    const host = window.location.hostname
    return "wss://" + host + ":8080/ws"
}

const setState = (state) => {
    store.dispatch(setAutonbahnConnectionState(state))
}

const errorIfNotConnected = () => {
    if(!session)
        throw new Error('Autobahn not connected')
}

const subscriptions = {}
const procedures = {}

// Base Functions

export const publish = (topic, args, kwargs, options) => {
    errorIfNotConnected()
    return session.publish(baseUri + topic, args, kwargs, options)
}

export const subscribe = async (topic, handler, options) => {
    errorIfNotConnected()
    topic = baseUri + topic
    if(!(topic in subscriptions)) {
        subscriptions[topic] = []
    }
    const subscription = session.subscribe(topic, handler, options)
    subscriptions[topic].push(subscription)
    return subscription
}

export const unsubscribe = async (subscription) => {
    if(typeof subscription === 'string') {
        subscription = subscriptions[baseUri + subscription]
    } else if(!Array.isArray(subscription)) {
        subscription = [subscription]
    }

    await Promise.all(subscription.forEach(async (cur) =>{
        await session.unsubscribe(cur)
    }))
}

export const call = (procedure, args=null, kwargs=null, options=null) => {
    errorIfNotConnected()
    return session.call(baseUri + procedure, args, kwargs, options)
}

export const register = async (procedure, endpoint, options=null) => {
    errorIfNotConnected()
    if(!(procedure in procedures)) {
        procedures[procedure] = [];
    }
    const proc = await session.register(procedure, endpoint, options)
    procedures[procedure].push(proc)
    return proc
}

export const tryCookieAuth = (onOpen) => {
    connection = new autobahn.Connection({
        url: getUrl(),
        realm: 'fireline',
        authmethods: ['cookie'],
    })

    connection.onopen = (_session, details) => {
        session = _session
        setState(autobahnConnectionState.connected)
        if(typeof onOpen === 'function')
            onOpen(session, details)
    }

    connection.onclose = () => {
        setState(autobahnConnectionState.disconnected)
    }

    connection.open()
    setState(autobahnConnectionState.connecting)
}

export const tryUserAuth = async (user, pw) => {
    return new Promise((resolve, reject) => {
        let onchallenge = (session, method, extra) => {
            console.log("onchallenge", method, extra);
            if (method === "ticket") {
                return pw
            } else {
                throw Error("don't know how to authenticate using '" + method + "'");
            }
        }

        connection = new autobahn.Connection({
            url: getUrl(),
            realm: 'fireline',
            authmethods: ['cookie', 'ticket'],
            authid: user,
            onchallenge,
        })

        connection.onopen = (_session, details) => {
            session = _session
            setState(autobahnConnectionState.connected)
            resolve({session: _session, details})
        }

        connection.onclose = (reason, details) => {
            setState(autobahnConnectionState.disconnected)
            reject({reason, details})
        }

        connection.open()
        setState(autobahnConnectionState.connecting)
    })
}

export const connectToWs = (user, pw, onOpen, onClose) => {

    tryUserAuth(user, pw)
        .then(res => {
            if(typeof onOpen === 'function')
                onOpen(res.session, res.details)
        })
        .catch(res => {
            if(typeof onClose === 'function')
                onClose(res.session, res.details)
        })
}

export const getUserErrorMessage = (reason, details) => {
    if(typeof reason === 'object') {
        details = reason.details
        reason = reason.reason
    }
    switch(reason) {
        case 'unreachable':
            return 'Server not reachable'
        case 'unsupported':
            return 'Network error'
        case 'lost':
        case 'closed':
            if(details.reason.startsWith('io.fireline.error'))
                return details.message
            else
                console.error(details.message)
            return 'Internal server error'
        default:
            console.error(reason, details)
            return 'Unknown Error'
    }
}

export const disconnectWs = (reason, details) => {
    console.warn('disconnect WS')
    setState(autobahnConnectionState.disconnected)
    if(connection) {
        console.warn('disconnect connection')
        connection.close(reason, details)
    }
    connection = null
    session = null
}
