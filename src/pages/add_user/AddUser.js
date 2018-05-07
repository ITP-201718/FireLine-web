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
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save'

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    bigAvatar: {
        width: 150,
        height: 150,
    },
    toRight: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20,
    },
})

class AddUser extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant='display1'>Benutzer hinzufügen</Typography>
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Benutzername"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="E-mail"
                                type='email'
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Passwort"
                                type='password'
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Passwort wiederholen"
                                type="password"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                        <Grid itme xs={12}>
                            <div className={classes.toRight}>
                                <Button variant="raised" color="primary" size="small">
                                    Hinzufügen
                                    <Save className={classes.rightIcon} />
                                </Button>
                            </div>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        )
    }
}

AddUser.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddUser)