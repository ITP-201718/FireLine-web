import { connect } from 'react-redux'
import Profile from './Profile'
import {setUserMail, setUserVName, setUserNName} from '../../redux/actions/profile';
import {profileGetMail, profileGetVName, profileGetNName} from '../../redux/selectors/selectors';
import {call} from '../../general/Autobahn';
import {setUserMessageMessage, setUserMessageOpen} from '../../redux/actions/userMessage';

const mapStateToProps = (state) => {
    return {
        mail: profileGetMail(state),
        vname: profileGetVName(state),
        nname: profileGetNName(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setvname: async (value) => {
            await call('profile.set_vname', [], {vname: value})
            dispatch(setUserVName(value))
        },
        setnname: async (value) => {
            await call('profile.set_nname', [], {nname: value})
            dispatch(setUserNName(value))
        },
        setmail: async (value) => {
            await call('profile.set_mail', [], {mail: value})
            dispatch(setUserMail(value))
        },
        showUserMessage: (message) => {
            dispatch(setUserMessageMessage(message))
            dispatch(setUserMessageOpen(true))
        }
    }
}

const Account = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

export default Account