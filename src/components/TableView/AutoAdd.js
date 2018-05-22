import React from 'react'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import {MenuItem} from 'material-ui/Menu'
import { call } from '../../general/Autobahn'
import withAction from '../withAction'
import FormElement from '../FormElement'

const styles = {
    dialog: {
        width: 600,
    }
}

class AutoAdd extends React.Component {

    constructor(props) {
        super(props)
        const {actionProp, uris, columns} = props
        actionProp.setOption('uri', uris.create)
        let formaters = {}
        for(let column of columns) {
            if('format' in column) {
                formaters[column.id] = column.format
            }
        }
        actionProp.setOption('formatters', formaters)
        actionProp.setOption('onSuccess', this.onSuccess)

        this.state = {
            values: {}
        }
    }

    onSuccess = () => {
        const {onClose} = this.props
        if(typeof onClose === 'function') {
            onClose()
        }
    }

    handleInputChange = (event, cId) => {
        const {values} = this.state

        const newValues = {...values, [cId]: event.target.value}
        this.setState({values: newValues})
    }

    handleAdd = () => {
        const {values} = this.state
        const {uris, onClose} = this.props

        call(uris.create, [], {values}).then(() => {
            onClose()
            this.setState({values: {}})
        })
    }

    render() {
        const {classes, title, text, columns, open, onClose,
            actionProp} = this.props
        let first = true

        return (
            <Dialog
                open={open}
                onClose={onClose}
                classes={{paper: classes.dialog}}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {(text) && (
                        <DialogContentText>
                            {text}
                        </DialogContentText>
                    )}

                    {columns.map(column => {
                        if(column.id === 'id') {
                            return null
                        }
                        const ret = (
                            <FormElement key={column.id}
                                         name={column.id}
                                         actionProp={actionProp}>
                                <TextField
                                    type={column.type}
                                    select={column.type === 'oneof'}
                                    label={column.label}
                                    margin='dense'
                                    fullWidth
                                    autoFocus={first}
                                >
                                    {column.type === 'oneof' && Object.keys(column.oneof).map((item) => {
                                        return <MenuItem key={item} value={item}>{column.oneof[item]}</MenuItem>
                                    })}
                                </TextField>
                            </FormElement>
                        )

                        first = false
                        return ret
                    })}
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={onClose}>
                        Abbrechen
                    </Button>
                    <Button color='primary' onClick={actionProp.executeAction}>
                        Hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>)
    }
}

export default withStyles(styles)(withAction({actionProp: true})(AutoAdd))