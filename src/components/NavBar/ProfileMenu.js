import React from 'react'
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

const ProfileMenu = ({classes, userName, userImgPath}) => {

    return (<div>
        <IconButton>
            <Avatar src={userImgPath} className={classes.avatar}>
                {userImgPath ? '' : <AccountCircle/>}
            </Avatar>
        </IconButton>
        <Menu open={false}>
            <MenuItem>{userName ? userName : 'No Username'}</MenuItem>
        </Menu>
    </div>)
}

export default withStyles(styles)(ProfileMenu)