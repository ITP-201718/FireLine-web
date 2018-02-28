import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
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
});

class Account extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={4}>
                        <TextField
                            label="Name"
                            margin="normal"
                            fullWidth
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