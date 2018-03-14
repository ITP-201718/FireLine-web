import { connect } from 'react-redux'
import ProfileIcon_c from './ProfileIcon'
import { push } from 'react-router-redux'

import {
    setLoggedIn,
    setMenuOpen,
    setMenuAnchorEl
} from '../../redux/actions/profile';
import {
    profileGetAnchorElMenu,
    profileGetLoggedIn, profileGetMail, profileGetMenuOpen, profileGetName,
    profileMd5Hash
} from '../../redux/selectors/selectors';

const mapStateToProps = (state) => {
    return {
        loggedIn: profileGetLoggedIn(state),
        userName: profileGetName(state),
        userMail: profileGetMail(state),
        gravatarHash: profileMd5Hash(state),
        menuOpen: profileGetMenuOpen(state),
        anchorElMenu: profileGetAnchorElMenu(state),
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