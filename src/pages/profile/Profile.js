import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save'
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography'
import Container from '../../components/Container'
import Avatar from 'material-ui/Avatar'
import classNames from 'classnames'
import { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { DatePicker } from 'material-ui-pickers'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    toRight: {
        display: 'flex',
        justifyContent: 'flex-end',
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
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    bigAvatar: {
        width: 150,
        height: 150,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class Account extends React.Component {

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    constructor(props) {
        super(props)
        const { profile } = props
        this.state = {
            values: profile,
            changed: [],
            saving: false,
        }
    }

    /**
     * Get value out of the values
     * @param {string} name Name of the value to get
     * @param {*} def Default value. Defaults to null
     * @returns {*} The value it is set to
     */
    getValue = (name, def = null) => {
        let {values} = this.state
        return name in values ? values[name] : def
    }

    updateValue = (name, value) => {
        let values = {...this.state.values}
        values[name] = value
        this.setState({values})
        if(!this.state.changed.includes(name)) {
            this.setState({changed: [...this.state.changed, name]})
        }
    }

    save = async () => {
        if(this.state.changed.length === 0) {
            this.props.showUserMessage('Nothing has changed')
            return
        }

        this.setState({saving: true})
        let updateVals = {}
        for(let i in this.state.changed) {
            let input = this.state.changed[i]
            updateVals[input] = this.state.values[input]
        }
        await this.props.setProfile(updateVals)
        this.setState({saving: false, changed: []})
        this.props.showUserMessage('Successfully saved Profile')
    }

    render() {
        const {classes, gravatarHash} = this.props;

        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant='display1'>Profile</Typography>
                    <div className={classes.row}>
                        <Avatar
                            alt="Adelle Charles"
                            src={'https://www.gravatar.com/avatar/' + gravatarHash + '?d=identicon&s=128'}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                    </div>
                    <Grid container spacing={24} justify="center">

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Vorname"
                                value={this.getValue('first_name', 'Unknown')}
                                fullWidth
                                onChange={(event) => {
                                    this.updateValue('first_name', event.target.value)
                                }}
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
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nachname"
                                value={this.getValue('last_name', 'Unknown')}
                                fullWidth
                                onChange={(event) => {
                                    this.updateValue('last_name', event.target.value)
                                }}
                                margin="normal"
                                InputLabelProps={{
                                    FormControlClasses: {
                                        focused: classes.inputLabelFocused,
                                    }
                                }}
                                InputProps={{ classes: {
                                    inkbar: classes.inputInkbar,
                                }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Benutzername"
                                fullWidth
                                margin="normal"
                                value={this.getValue('id', 'Unknown')}
                                onChange={(event) => {this.setState('id', event.target.value)}}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="E-mail"
                                value={this.getValue('mail', 'Unknown')}
                                type='email'
                                fullWidth
                                onChange={(event) => {this.updateValue('mail', event.target.value)}}
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
                            />
                        </Grid>

                        {/* Password */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                value={this.getValue('password', '')}
                                onChange={(event) => {this.updateValue('password', event.target.value)}}
                                label="Password"
                                id="pass"
                                fullWidth
                                type="password"
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
                            />
                        </Grid>

                        {/* Password validate */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                value={this.getValue('password_confirm', '')}
                                onChange={(event) => {this.updateValue('password_confirm', event.target.value)}}
                                label="Passwort wiederholen"
                                id="pass_again"
                                fullWidth
                                type="password"
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
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <form className={classes.root} autoComplete="off" >
                                <FormControl className={classes.FormControl} margin="normal" fullWidth>
                                    <InputLabel htmlFor="sex-simple">Geschlecht</InputLabel>
                                    <Select
                                        disabled
                                        value={this.getValue('gender', '')}
                                        onChange={(event) => {this.updateValue('gender', event.target.value)}}
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
                            <div className="picker">
                                <DatePicker
                                    disabled
                                    label="Geburtsdatum"
                                    format="DD/MM/YYYY"
                                    placeholder="10/10/2018"
                                    // handle clearing outside => pass plain array if you are not controlling value outside
                                    mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                    fullWidth
                                    margin="normal"
                                    value={this.getValue('birthday', new Date())}
                                    onChange={(date) => {this.updateValue('birthday', date)}}
                                    openToYearSelection={true}
                                    animateYearScrolling={false}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                value={this.getValue('rank', 'Kein Rang')}
                                onChange={(event) => {this.updateValue('rang', event.target.value)}}
                                label="Rang"
                                id="rang"
                                fullWidth
                                type="text"
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
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                disabled
                                value={this.getValue('jurisdiction', 'Kein Zuständigkeitsbereich')}
                                onChange={(event) => {this.updateValue('rang', event.target.value)}}
                                label="Zuständigkeitsbereich"
                                id="jurisdiction"
                                fullWidth
                                type="text"
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
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div className={classes.toRight}>
                                <div className={classes.wrapper}>
                                    <Button variant="raised" color='primary' size='small'
                                            onClick={this.save} disabled={this.state.saving}>
                                        Save
                                        <Save className={classes.rightIcon} />
                                    </Button>
                                    {this.state.saving &&
                                    <CircularProgress
                                        className={classes.progress}
                                        //style={{color: theme.palette.text.disabled}}
                                        size={24}/>
                                    }
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        )
    }
}

Account.propTypes = {
    classes: PropTypes.object,
    showUserMessage: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    gravatarHash: PropTypes.string,
}

export default withStyles(styles)(Account)