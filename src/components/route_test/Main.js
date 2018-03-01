import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class Main extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={12} sm={10} md={8} lg={6}>
                        <h1>Hello Users</h1>
                        <h2>This is the main page</h2>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(Main)