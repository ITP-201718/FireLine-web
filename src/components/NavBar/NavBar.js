import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import ProfileMenu from './ProfileMenu';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const NavBar = ({ classes, loggedIn, userName, toggleLogin }) => (
    <div className={classes.root}>
        <AppBar position='static'>
            <Toolbar>
                <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                    <MenuIcon/>
                </IconButton>
                <Typography variant='title' color='inherit' className={classes.flex}>
                    FireLine
                </Typography>
                {
                    loggedIn ?
                        <ProfileMenu userImgPath='user.png' /> :
                        <Button color='inherit' onClick={toggleLogin}>{loggedIn ? 'Logout' : 'Login'}</Button>
                }
            </Toolbar>
        </AppBar>
    </div>
)

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    toggleLogin: PropTypes.func.isRequired,
    userName: PropTypes.string,
}

export default withStyles(styles)(NavBar)