import LoginPopup from './LoginPopup'
import { connect } from 'react-redux'
import {
    loginPopupGetName,
    loginPopupGetPw,
    loginPopupIsOpen,
    autobahnConnectionState, loginPopupError, loginPopupErrorMsg,
} from '../../redux/selectors/selectors';
import {
    loginPopupSetName,
    loginPopupSetPw,
    loginPopupSetOpen, loginPopupSetErrorMsg, loginPopupSetError,
} from '../../redux/actions/loginPopup';
import {call, getUserErrorMessage, tryUserAuth} from '../../general/Autobahn';
import {setLoggedIn, setUserMail, setUserName} from '../../redux/actions/profile';

const mapStateToProps = (state) => {
    return {
        user: loginPopupGetName(state),
        pw: loginPopupGetPw(state),
        open: loginPopupIsOpen(state),
        connectionState: autobahnConnectionState(state),
        error: loginPopupError(state),
        errorMsg: loginPopupErrorMsg(state)
    }
}

function connectToWs(user, pw) {
    return (dispatch, getStore, session) => {
        tryUserAuth(user, pw)
            .then(res => {
                dispatch(loginPopupSetName(''))
                dispatch(loginPopupSetOpen(false))
                dispatch(setLoggedIn(true))

                call('profile.get_mail').then((res) => {
                    dispatch(setUserMail(res))
                })
                call('profile.get_name').then((res) => {
                    dispatch(setUserName(res))
                })

                /*res.session.call('io.fireline.api.profile.get_mail').then((res) => {
                    dispatch(setUserMail(res))
                })*/
            })
            .catch(error => {
                dispatch(loginPopupSetErrorMsg(getUserErrorMessage(error)))
                dispatch(loginPopupSetError(true))
            })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {dispatch(loginPopupSetName(name))},
        setPw: (pw) => {dispatch(loginPopupSetPw(pw))},
        setOpen: (open) => {dispatch(loginPopupSetOpen(open))},
        handleLogin: (user, pw) => dispatch(connectToWs(user, pw)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup)