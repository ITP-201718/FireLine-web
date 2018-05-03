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
import Input, {InputLabel} from 'material-ui/Input'
import {MenuItem} from 'material-ui/Menu'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Select from 'material-ui/Select'
import {DatePicker} from 'material-ui-pickers'

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
class AddMitglied extends React.Component {

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant='display1'>Mitglied hinzufügen</Typography>
                    <div className={classes.row}>
                        <Avatar
                            alt="Blank"
                            src="/img/default_user.png"
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
                            <form className={classes.root} autoComplete="off">
                                <FormControl className={classes.FormControl} margin="normal" fullWidth>
                                    <InputLabel htmlFor="sbs-simple">Staatsbürgerschaft</InputLabel>
                                    <Select
                                        value={'oe'}
                                        onChange={this.handleChange}
                                        unputProps={{
                                            name: 'sbs',
                                            id: 'sbs-simple'
                                        }}
                                    >
                                        <MenuItem value={'oe'}>Österreich</MenuItem>
                                        <MenuItem value={'de'}>Deutschland</MenuItem>
                                        <MenuItem value={'it'}>Italien</MenuItem>
                                        <MenuItem value={'sk'}>Slowakei</MenuItem>
                                        <MenuItem value={'pe'}>Persien</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="picker">
                                <DatePicker
                                    label="Geburtsdatum"
                                    format="DD/MM/YYYY"
                                    placeholder="10/10/2018"
                                    // handle clearing outside => pass plain array if you are not controlling value outside
                                    mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                    fullWidth
                                    margin="normal"
                                    value={new Date()}
                                    onChange={this.handleDateChange}
                                    animateYearScrolling={false}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <form className={classes.root} autoComplete="off">
                                <FormControl className={classes.FormControl} margin="normal" fullWidth>
                                    <InputLabel htmlFor="zugh-simple">Zugehörigkeit</InputLabel>
                                    <Select
                                        value={'a'}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'zugh',
                                            id: 'zugh-simple'
                                        }}
                                    >
                                        <MenuItem value={'a'}>Aktiv</MenuItem>
                                        <MenuItem value={'j'}>Jugend</MenuItem>
                                        <MenuItem value={'r'}>Reservist</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <form className={classes.root} autoComplete="off" >
                                <FormControl className={classes.FormControl} margin="normal" fullWidth>
                                    <InputLabel htmlFor="sex-simple">Geschlecht</InputLabel>
                                    <Select
                                        value={'m'}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'sex',
                                            id: 'sex-simple'
                                        }}
                                    >
                                        <MenuItem value={'m'}>Männlich</MenuItem>
                                        <MenuItem value={'f'}>Weiblich</MenuItem>
                                        <MenuItem value={'o'}>Anders</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <form className={classes.root} autoComplete="off">
                                <FormControl className={classes.FormControl} margin="normal" fullWidth>
                                    <InputLabel htmlFor="rang-simple">Rang</InputLabel>
                                    <Select
                                        value={'olm'}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'rang',
                                            id: 'rang-simple'
                                        }}
                                    >
                                        <MenuItem value={'pfm'}>Probefeuerwehrmann</MenuItem>
                                        <MenuItem value={'fm'}>Feuerwehrmann</MenuItem>
                                        <MenuItem value={'ofm'}>Oberfeuerwehrmann</MenuItem>
                                        <MenuItem value={'hfm'}>Hauptfeuerwehrmann</MenuItem>
                                        <MenuItem value={'lm'}>Löschmeister</MenuItem>
                                        <MenuItem value={'olm'}>Oberlöschmeister</MenuItem>
                                        <MenuItem value={'hlm'}>Hauptlöschmeister</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </div>
    )
    }
    }

    export default withStyles(styles)(AddMitglied)