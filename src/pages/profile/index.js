import { connect } from 'react-redux'
import Account_c from './Profile'
import {setUserMail, setUserName} from '../../redux/actions/profile';
import {profileGetMail, profileGetName} from '../../redux/selectors/selectors';
import {call} from '../../general/Autobahn';
import {setUserMessageMessage, setUserMessageOpen} from '../../redux/actions/userMessage';

const mapStateToProps = (state) => {
    return {
        userMail: profileGetMail(state),
        userName: profileGetName(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserName: async (value) => {
            await call('profile.set_name', [], {name: value})
            dispatch(setUserName(value))
        },
        setUserMail: async (value) => {
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
)(Account_c)

export default Account