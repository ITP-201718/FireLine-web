import LoginPopup from './LoginPopup'
import { connect } from 'react-redux'
import {
    loginPopupGetName,
    loginPopupGetPw,
    loginPopupIsOpen,
    autobahnConnectionState,
} from '../../redux/selectors/selectors';
import {
    loginPopupSetName,
    loginPopupSetPw,
    loginPopupSetOpen,
} from '../../redux/actions/loginPopup';
import {connectToWs} from '../../general/Autobahn';
import {setLoggedIn, setUserMail} from '../../redux/actions/profile';

const mapStateToProps = (state) => {
    return {
        user: loginPopupGetName(state),
        pw: loginPopupGetPw(state),
        open: loginPopupIsOpen(state),
        connectionState: autobahnConnectionState(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {dispatch(loginPopupSetName(name))},
        setPw: (pw) => {dispatch(loginPopupSetPw(pw))},
        setOpen: (open) => {dispatch(loginPopupSetOpen(open))},
        handleLogin: (user, pw) => {
            dispatch((dispatch, getStore, api) => {
                connectToWs(user, pw, (session) => {
                    dispatch(loginPopupSetName(''))
                    dispatch(loginPopupSetOpen(false))
                    dispatch(setLoggedIn(true))
                    session.call("io.fireline.api.profile.get_mail").then((res) => {
                        console.log("Got Mail: " + res)
                        dispatch(setUserMail(res))
                    })
                })
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup)