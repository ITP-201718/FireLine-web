/**
 * Created by Benni on 03.05.2018.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Container from "../../components/Container/Container";
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    bigAvatar: {
        width: 150,
        height: 150,
    },
})

class AddUser extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant='display1'>Add User</Typography>
                    <div className={classes.row}>
                        <Avatar
                            alt="Adelle Charles"
                            src='/img/default_user.png'
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                    </div>

                    <Grid container spacing={24} justify="">

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Vorname"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nachname"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                    </Grid>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(AddUser)