import autobahn from 'autobahn'
import { store } from './Redux';
import {
    setAutonbahnConnectionState,
    autobahnConnectionState
} from '../redux/actions/autobahn';

export let session = null;

const DEBUGGING = true

const getUrl = () => {
    if(DEBUGGING)
        return "wss://fireline.io:8080/api"
    const protocol = window.location.protcol === 'https' ? 'wss' : 'ws'
    const host = window.location.hostname
    return protocol + "://" + host + ":8080/ws"
}

const setState = (state) => {
    store.dispatch(setAutonbahnConnectionState(state))
}

export const tryCookieAuth = (onOpen) => {
    let connection = new autobahn.Connection({
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

export const connectToWs = (user, pw, onOpen, onClose) => {

    console.log(user, pw)

    let onchallenge = (session, method, extra) => {
        console.log("onchallenge", method, extra);
        if (method === "ticket") {
            return pw
        } else {
            throw Error("don't know how to authenticate using '" + method + "'");
        }
    }

    let connection = new autobahn.Connection({
        url: getUrl(),
        realm: 'fireline',
        authmethods: ['cookie', 'ticket'],
        authid: user,
        onchallenge,
    })

    connection.onopen = (_session, details) => {
        session = _session
        setState(autobahnConnectionState.connected)
        if(typeof onOpen === 'function')
            onOpen(session, details)
    }

    connection.onclose = (reason, details) => {
        setState(autobahnConnectionState.disconnected)
        if(typeof onClose === 'function')
            onClose(reason, details)
    }

    connection.open()
    setState(autobahnConnectionState.connecting)
}