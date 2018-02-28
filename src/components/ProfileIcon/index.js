import { connect } from 'react-redux'
import ProfileIcon_c from './ProfileIcon'
import { push } from 'react-router-redux'
import {
    setLoggedIn,
    setMenuOpen,
    setMenuAnchorEl
} from '../../actions/profile';

const mapStateToProps = (main_state) => {
    let state = main_state.get('profile')
    return {
        loggedIn: state.get('loggedIn'),
        userName: state.get('name'),
        userImgPath: state.get('imgPath'),
        menuOpen: state.get('menuOpen'),
        anchorElMenu: state.get('anchorElMenu'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: (loggedIn) => {dispatch(setLoggedIn(loggedIn))},
        setMenuOpen: (open) => {dispatch(setMenuOpen(open))},
        setMenuAnchorEl: (el) => {dispatch(setMenuAnchorEl(el))},
        push: (to) => {dispatch(push(to))}
    }
}

const ProfileIcon = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileIcon_c)

export default ProfileIcon