import React  from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui-icons/AccountCircle';
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.primary.dark,
    }
})

class ProfileMenu extends React.Component {

    openMenu = (event) => {
        const { setMenuAnchorEl, setMenuOpen } = this.props
        setMenuAnchorEl(event.currentTarget);
        setMenuOpen(true);
    }

    closeMenu = () => {
        const { setMenuAnchorEl, setMenuOpen } = this.props
        setMenuOpen(false)
        setMenuAnchorEl(null)
    }

    logout = () => {
        const { setLoggedIn } = this.props
        setLoggedIn(false)
        this.closeMenu()
    }

    render() {
        const {classes, userName, userImgPath, menuOpen, anchorElMenu, push } = this.props;
        return (<div>
            <IconButton onClick={this.openMenu}>
                <Avatar src={userImgPath} className={classes.avatar} alt={userName}>
                    {userImgPath ? '' : <AccountCircle/>}
                </Avatar>
            </IconButton>

            <Menu
                open={menuOpen}
                anchorEl={anchorElMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={this.closeMenu}
            >
                <MenuItem onClick={() => push('/account')}>My Account</MenuItem>
                <MenuItem onClick={() => push('/')}>Main</MenuItem>
                <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
        </div>)
    }

}

ProfileMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    userImgPath: PropTypes.string,
    menuOpen: PropTypes.bool.isRequired,
    anchorElMenu: PropTypes.object,
    setMenuOpen: PropTypes.func.isRequired,
    setMenuAnchorEl: PropTypes.func.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfileMenu)