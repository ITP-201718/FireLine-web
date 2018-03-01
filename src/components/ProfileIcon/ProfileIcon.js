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
        const { setLoggedIn, push } = this.props
        push('/')
        setLoggedIn(false)
        this.closeMenu()
    }

    render() {
        const {classes, userName, userMail, menuOpen, anchorElMenu, push, gravatarHash } = this.props;
        return (<div>
            <IconButton onClick={this.openMenu}>
                {
                    userMail ?
                        <Avatar src={'https://www.gravatar.com/avatar/' + gravatarHash + '?d=identicon&s=128'}
                                className={classes.avatar} alt={userName}/> :
                        <Avatar className={classes.avatar} alt={userName}>
                            <AccountCircle/>
                        </Avatar>
                }
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
                <MenuItem onClick={() => push('/')}>Main</MenuItem>
                <MenuItem onClick={() => push('/account')}>My Account</MenuItem>
                <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
        </div>)
    }

}

ProfileMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    userMail: PropTypes.string,
    menuOpen: PropTypes.bool.isRequired,
    anchorElMenu: PropTypes.object,
    setMenuOpen: PropTypes.func.isRequired,
    setMenuAnchorEl: PropTypes.func.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfileMenu)