import { connect } from 'react-redux'
import ProfileButton_c from './ProfileButton'
import {
    setLoggedIn
} from '../../redux/actions/profile';
import {
    loginPopupSetOpen
} from '../../redux/actions/loginPopup';

const mapStateToProps = (main_state) => {
    let state = main_state.get('profile')
    return {
        loggedIn: state.get('loggedIn'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: (loggedIn) => {
            dispatch(setLoggedIn(loggedIn))
        },
        openPopup: () => {
            dispatch(loginPopupSetOpen(true))
        }
    }
}

const ProfileButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileButton_c)

export default ProfileButton