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
import {setLoggedIn, setUserMail, setUserVName, setUserNName} from '../../redux/actions/profile';

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

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {dispatch(loginPopupSetName(name))},
        setPw: (pw) => {dispatch(loginPopupSetPw(pw))},
        setOpen: (open) => {dispatch(loginPopupSetOpen(open))},
        handleLogin: (user, pw) => dispatch(connectToWs(user, pw)),
    }
}

function connectToWs(user, pw) {
    return (dispatch, getStore, session) => {
        tryUserAuth(user, pw)
            .then(res => {
                dispatch(loginPopupSetName(''))
                dispatch(loginPopupSetOpen(false))
                dispatch(loginPopupSetError(false))
                dispatch(setLoggedIn(true))

                call('profile.get_mail').then((res) => {
                    dispatch(setUserMail(res))
                })
                call('profile.get_vname').then((res) => {
                    dispatch(setUserVName(res))
                })
                call('profile.get_nname').then((res) => {
                    dispatch(setUserNName(res))
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup)