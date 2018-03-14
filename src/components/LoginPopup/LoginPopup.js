import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import { AUTOBAHN_CONNECTION_STATE } from '../../redux/actions/names';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    loaderOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: 'blue',
        position: 'absolute',
        zIndex: 1310,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})

class LoginPopup extends React.Component {

   close = () => {
       const { setOpen, setPw } = this.props
       setPw('')
       setOpen(false)
   }

   login = () => {
       const { handleLogin, user, pw, setPw } = this.props
       setPw('')
       handleLogin(user, pw)
   }

    render() {
        const { open, user, setName, pw, setPw, fullScreen, classes, connectionState } = this.props
        const connecting = connectionState === AUTOBAHN_CONNECTION_STATE.connecting

        return (
            <Dialog open={open} onClose={this.close} fullScreen={fullScreen}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='normal'
                        label='Username/Email'
                        value={user}
                        onChange={(event) => {setName(event.target.value)}}
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        label='Password'
                        type='password'
                        value={pw}
                        onChange={(event) => {setPw(event.target.value)}}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color='secondary'
                        onClick={this.close}
                        disabled={connecting}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='primary'
                        onClick={this.login}
                        disabled={connecting}
                    >
                        Login
                    </Button>
                </DialogActions>

                { connecting && <div className={classes.loaderOverlay}>
                    <CircularProgress size={75} className={classes.buttonProgress} />
                </div> }
            </Dialog>
        )
    }
}

LoginPopup.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    user: PropTypes.string,
    pw: PropTypes.string,
    setName: PropTypes.func.isRequired,
    setPw: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
}

export default withStyles(styles)(withMobileDialog()(LoginPopup))