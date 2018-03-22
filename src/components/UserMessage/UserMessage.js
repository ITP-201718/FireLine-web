import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close';
import PropTypes from 'prop-types'

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    }
})

class UserMessage extends React.Component {

    close = (event, reason) => {
        if(reason === 'clickaway') {
            return
        }
        this.props.close()
    }

    render = () => {
        const {open, message, closeDuration, classes} = this.props

        return (
            <Snackbar
                open={open}
                message={message}
                autoHideDuration={closeDuration}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClose={this.close}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.close}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        )
    }
}

UserMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    closeDuration: PropTypes.number.isRequired,
}

export default withStyles(styles)(UserMessage)