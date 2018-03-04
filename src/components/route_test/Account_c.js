import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inputLabelFocused: {
        color: theme.palette.secondary.main,
    },
    inputInkbar: {
        '&:after': {
            backgroundColor: theme.palette.secondary.main,
        },
    }
});

class Account extends React.Component {

    render() {
        const {classes, userMail, setUserMail} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={12} sm={11} md={12} lg={10} xl={8}>
                        <TextField
                            label="E-Mail"
                            margin="normal"
                            InputLabelProps={{
                                FormControlClasses: {
                                    focused: classes.inputLabelFocused,
                                }
                            }}
                            InputProps={{
                                classes: {
                                    inkbar: classes.inputInkbar,
                                }
                            }}
                            fullWidth
                            value={userMail}
                            onChange={(event) => {
                                setUserMail(event.target.value)
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Account.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(Account)