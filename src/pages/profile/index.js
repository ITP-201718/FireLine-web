import { connect } from 'react-redux'
import Profile from './Profile'
import {profileGet, profileMd5Hash} from '../../redux/selectors/selectors';
import {setUserMessageMessage, setUserMessageOpen} from '../../redux/actions/userMessage';
import {call} from '../../general/Autobahn'
import {setUserProfile} from '../../redux/actions/profile';

const mapStateToProps = (state) => {
    return {
        profile: profileGet(state),
        gravatarHash: profileMd5Hash(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showUserMessage: (message) => {
            dispatch(setUserMessageMessage(message))
            dispatch(setUserMessageOpen(true))
        },
        setProfile: async (profile) => {
            await call('profile.update', [], {values: profile})
            dispatch(setUserProfile(profile))
        }
    }
}

const Account = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

export default Account