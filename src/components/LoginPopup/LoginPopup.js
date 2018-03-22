import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import { AUTOBAHN_CONNECTION_STATES } from '../../redux/names';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'

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
    },
    text: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flex: "0 0 auto",
        alignItems: "center",
    },
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

   onKeyPress = (event) => {
       if(event.charCode === 13) {
           event.preventDefault()
           this.login()
       }
   }

    render() {
        const { open, user, setName, pw, setPw, fullScreen, classes, connectionState, error, errorMsg } = this.props
        const connecting = connectionState === AUTOBAHN_CONNECTION_STATES.connecting

        return (
            <Dialog open={open} onClose={this.close} fullScreen={fullScreen}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='normal'
                        label='Username/Email'
                        onKeyPress={this.onKeyPress}
                        value={user}
                        onChange={(event) => {setName(event.target.value)}}
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        label='Password'
                        type='password'
                        onKeyPress={this.onKeyPress}
                        value={pw}
                        onChange={(event) => {setPw(event.target.value)}}
                        fullWidth
                    />
                    {error &&
                        <Typography color="error" className={classes.text}>
                            <Icon>error</Icon>&nbsp;<span>{errorMsg}</span>
                        </Typography>
                    }
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
    error: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
}

export default withStyles(styles)(withMobileDialog()(LoginPopup))