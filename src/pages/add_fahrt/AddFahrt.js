/**
 * Created by Benni on 17.05.2018.
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

class AddFahrt export React.Component {

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant='display1'>Fahrt eintragen</Typography>

                </Container>
            </div>
        )
    }
}

AddFahrt.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles) (AddFahrt)