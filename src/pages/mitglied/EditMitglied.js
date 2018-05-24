/**
 * Created by Benni on 03.05.2018.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Container from '../../components/Container/Container';
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import {MenuItem} from 'material-ui/Menu'
import {DatePicker} from 'material-ui-pickers'
import withAction from '../../components/withAction/index'
import {format} from 'date-fns'
import md5 from 'md5'
import FormElement from '../../components/FormElement/index'
import {store} from '../../general/Redux';
import {push} from 'react-router-redux'
import {call, registerOnConnect, unregisterOnConnect, isConnected} from '../../general/Autobahn'
import EnhancedSelect from '../../components/EnhancedSelect'

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
    },
    bigIcon: {
        fontSize: 40,
    },
})

const actionConfig = {
    actionProp: true,
    uri: 'member.update',
    idOutsideValues: true,
    onSuccess: () => {
        store.dispatch(push('/mitglied'))
    },
    defaultValues: {
        username: '',
        mail: '',
        first_name: '',
        last_name: '',
        sbuergerschaft: 'at',
        birthday: null,
        zugehoerigkeit: '',
        gender: '',
        rank: [],
        educations: [],
    },
    formaters: {
        birthday: (val) => {
            return val instanceof Date ? format(val, 'YYYY-MM-DD') : val
        },
        mail: (val) => {
            return val === '' ? null : val
        }
    }
}

class EditMitglied extends React.Component {

    componentWillMount() {
        this.getData()
    }

    componentWillUnmount() {
        if (this.onConnect) {
            unregisterOnConnect(this.onConnect)
        }
    }

    getData = async () => {
        const {params, actionProp} = this.props
        const {id} = params

        if (isConnected()) {
            const res = await call('member.get', [], {filter: {id}})
            let data = res.data[0]
            delete data.password
            data.mail = data.mail ? data.mail : ''
            data = {...actionConfig.defaultValues, ...data}
            console.log('data', data)
            actionProp.setOption('defaultValues', data, true)
            actionProp.updateValue('id', data.id)
            delete this.onConnect
        } else {
            this.onConnect = registerOnConnect(this.getData)
        }
    }

    render() {
        const {classes, actionProp} = this.props
        const {getValue, executeAction} = actionProp

        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant='display1'>
                        <IconButton onClick={() => {
                            store.dispatch(push('/mitglied'))
                        }}>
                            <Icon className={classes.bigIcon}>keyboard_arrow_left</Icon>
                        </IconButton>
                        Mitglied editieren</Typography>
                    <div className={classes.row}>
                        <Avatar
                            alt="Blank"
                            src={(getValue('mail') === '' || getValue('mail') === null) ? '/img/default_user.png' : 'https://www.gravatar.com/avatar/' + md5(getValue('mail')) + '?d=identicon&s=128'}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                    </div>

                    <Grid container spacing={24}>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='username'
                                actionProp={actionProp}
                            >
                                <TextField
                                    label="Benutzername"
                                    fullWidth
                                    margin="normal"
                                />
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='mail'
                                actionProp={actionProp}
                            >
                                <TextField
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                />
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='first_name'
                                actionProp={actionProp}
                            >
                                <TextField
                                    label="Vorname"
                                    fullWidth
                                    margin="normal"
                                />
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='last_name'
                                actionProp={actionProp}
                            >
                                <TextField
                                    label="Nachname"
                                    fullWidth
                                    margin="normal"
                                />
                            </FormElement>
                        </Grid>

                        {/*<Grid item xs={12} md={6}>
                            <FormElement
                                name='password'
                                actionProp={actionProp}
                            >
                                <TextField
                                    label="Password"
                                    type='password'
                                    fullWidth
                                    margin="normal"
                                />
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='password_confirm'
                                actionProp={actionProp}
                            >
                                <TextField
                                    label="Password bestätigen"
                                    type='password'
                                    fullWidth
                                    margin="normal"
                                />
                            </FormElement>
                        </Grid>{/**/}

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='sbuergerschaft'
                                actionProp={actionProp}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label='Staatsbürgerschaft'
                                    margin='normal'
                                >
                                    <MenuItem value={'keine'}>Keine</MenuItem>
                                    <MenuItem value={'at'}>Österreich</MenuItem>
                                    <MenuItem value={'de'}>Deutschland</MenuItem>
                                    <MenuItem value={'it'}>Italien</MenuItem>
                                    <MenuItem value={'sk'}>Slowakei</MenuItem>
                                    <MenuItem value={'pl'}>Polen</MenuItem>
                                </TextField>
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='birthday'
                                actionProp={actionProp}
                                onChangeFunc={e => e}
                            >
                                <DatePicker
                                    label="Geburtsdatum"
                                    format="DD/MM/YYYY"
                                    disableFuture
                                    // handle clearing outside => pass plain array if you are not controlling value outside
                                    //mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                    fullWidth
                                    margin="normal"
                                    animateYearScrolling={false}
                                    openToYearSelection
                                />
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='zugehoerigkeit'
                                actionProp={actionProp}
                            >
                                <TextField
                                    select
                                    label='Zugehörigkeit'
                                    fullWidth
                                    margin='normal'
                                >
                                    <MenuItem value={'n'}>Keine</MenuItem>
                                    <MenuItem value={'a'}>Aktiv</MenuItem>
                                    <MenuItem value={'j'}>Jugend</MenuItem>
                                    <MenuItem value={'r'}>Reservist</MenuItem>
                                </TextField>
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name='gender'
                                actionProp={actionProp}
                            >
                                <TextField
                                    select
                                    label='Geschlecht'
                                    fullWidth
                                    margin='normal'
                                >
                                    <MenuItem value={'m'}>Männlich</MenuItem>
                                    <MenuItem value={'f'}>Weiblich</MenuItem>
                                    <MenuItem value={'o'}>Anders</MenuItem>
                                </TextField>
                            </FormElement>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name={'educations'}
                                actionProp={actionProp}
                                onChangeFunc={(v) => v}
                            >
                                <EnhancedSelect
                                    multi
                                    uri='education.get'
                                    nameId='name'
                                    TextFieldProps={{
                                        fullWidth: true,
                                        label: 'Ausbildungen',
                                        margin: 'normal',
                                    }}
                                />
                            </FormElement>
                        </Grid>

                        {/*<Grid item xs={12} md={6}>
                            <FormElement
                                name='rank'
                                actionProp={actionProp}
                            >
                                <TextField
                                    select
                                    label='Rang'
                                    fullWidth
                                    margin='normal'
                                >
                                    <MenuItem value={'pfm'}>Probefeuerwehrmann</MenuItem>
                                    <MenuItem value={'fm'}>Feuerwehrmann</MenuItem>
                                    <MenuItem value={'ofm'}>Oberfeuerwehrmann</MenuItem>
                                    <MenuItem value={'hfm'}>Hauptfeuerwehrmann</MenuItem>
                                    <MenuItem value={'lm'}>Löschmeister</MenuItem>
                                    <MenuItem value={'olm'}>Oberlöschmeister</MenuItem>
                                    <MenuItem value={'hlm'}>Hauptlöschmeister</MenuItem>
                                </TextField>
                            </FormElement>
                        </Grid>*/}

                        <Grid item xs={12} md={6}>
                            <FormElement
                                name={'rank'}
                                actionProp={actionProp}
                                onChangeFunc={(v) => v}
                                valueFunc={(v) => {return typeof v === 'object' ? v.id : v}}
                            >
                                <EnhancedSelect
                                    uri='rank.get'
                                    nameId='name'
                                    TextFieldProps={{
                                        fullWidth: true,
                                        label: 'Rang',
                                        margin: 'normal',
                                    }}
                                />
                            </FormElement>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={classes.toRight}>
                                <Button variant="raised" color="primary" onClick={executeAction}>
                                    Ändern
                                    <Icon className={classes.rightIcon}>save</Icon>
                                </Button>
                            </div>
                        </Grid>{/**/}

                    </Grid>
                </Container>
            </div>
        )
    }
}

EditMitglied.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withAction(actionConfig)(EditMitglied))