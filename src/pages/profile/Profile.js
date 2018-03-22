import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save'
import { CircularProgress } from 'material-ui/Progress';

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
    }
});

class Account extends React.Component {

    constructor(props) {
        super(props)
        const { userName, userMail, setUserName, setUserMail } = props
        this.state = {
            updateCalls: {
                userName: setUserName,
                userMail: setUserMail,
            },
            values: {
                userName,
                userMail
            },
            changed: [],
            saving: false,
        }
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
        for(let i in this.state.changed) {
            let input = this.state.changed[i]
            await this.state.updateCalls[input](this.state.values[input])
        }
        this.setState({saving: false, changed: []})
        this.props.showUserMessage('Successfully saved Profile')
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={12} sm={11} md={12} lg={10} xl={8}>
                        <TextField
                            label="Name"
                            value={this.state.values.userName}
                            onChange={(event) => {
                                this.updateValue('userName', event.target.value)
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
                            fullWidth
                        />
                        <TextField
                            label="E-Mail"
                            value={this.state.values.userMail}
                            onChange={(event) => {
                                this.updateValue('userMail', event.target.value)
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
                            fullWidth
                        />
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
            </div>
        )
    }
}

Account.propTypes = {
    classes: PropTypes.object,
    showUserMessage: PropTypes.func.isRequired,
}

export default withStyles(styles)(Account)