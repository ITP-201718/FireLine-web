/**
 * Created by Benni on 11.05.2018.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Container from '../../components/Container/Container'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import TextField from 'material-ui/TextField'
import {InputLabel} from 'material-ui/Input'
import {MenuItem} from 'material-ui/Menu'
import {FormControl} from 'material-ui/Form'
import Select from 'material-ui/Select'
import {DatePicker} from 'material-ui-pickers'
import { TimePicker } from 'material-ui-pickers';

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    toRight: {
        display: 'felx',
        justifyContent: 'flex-end'
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20
    }
})

class AddEinsatz extends React.Component {

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant='display1'>Einsatz hinzufügen</Typography>
                    <Grid container spacing={24} justify="">

                        <Grid item xs={12}>
                            <form className={classes.root} autoComplete="off">
                                <FormControl className={classes.FormControl} margin="normal" fullWidth>
                                    <InputLabel htmlFor="einsatzstufe-simple">Einsatzstufe</InputLabel>
                                    <Select
                                        value={'t1'}
                                        onChange={this.handleChange}
                                        unputProps={{
                                            name: 'einsatzstufen',
                                            id: 'einsatzstufen-simple'
                                        }}
                                    >
                                        <MenuItem value={'t1'}>T1</MenuItem>
                                        <MenuItem value={'t2'}>T2</MenuItem>
                                        <MenuItem value={'t3'}>T3</MenuItem>
                                        <MenuItem value={'b1'}>B1</MenuItem>
                                        <MenuItem value={'b2'}>B2</MenuItem>
                                        <MenuItem value={'b3'}>B3</MenuItem>
                                        <MenuItem value={'b4'}>B4</MenuItem>
                                        <MenuItem value={'s1'}>S1</MenuItem>
                                        <MenuItem value={'s2'}>S2</MenuItem>
                                        <MenuItem value={'s3'}>S3</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <div className="picker">
                                <DatePicker
                                    label="Datum Von"
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
                            <div className="picker">
                                <DatePicker
                                    label="Datum Bis"
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
                            <div className="picker">
                                <TimePicker
                                    fullWidth
                                    ampm={false}
                                    label="Uhrzeit Von"
                                    value={new Date()}
                                    onChange={this.handleDateChange}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <div className="picker">
                                <TimePicker
                                    fullWidth
                                    ampm={false}
                                    label="Uhrzeit Bis"
                                    value={new Date()}
                                    onChange={this.handleDateChange}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Straße"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Hausnummer/Stiege/Tür"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Beschreibung"
                                fullWidth
                                margin="normal"
                                multiline={true}
                                rows={4}
                                rowsMax={4}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles) (AddEinsatz)