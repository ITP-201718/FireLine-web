import { connect } from 'react-redux'
import ProfileButton_c from './ProfileButton'
import {
    setLoggedIn,
    setUserName,
    setUserImgPath,
} from '../../actions/profile';

const mapStateToProps = (main_state) => {
    let state = main_state.get('profile')
    return {
        loggedIn: state.get('loggedIn'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: (loggedIn) => {
            if(!!loggedIn) {
                dispatch(setUserName('David'))
                dispatch(setUserImgPath('/user.jpg'))
            }
            dispatch(setLoggedIn(loggedIn))
        }
    }
}

const ProfileButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileButton_c)

export default ProfileButton