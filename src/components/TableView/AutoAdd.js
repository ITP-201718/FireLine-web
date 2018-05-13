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
import { call } from '../../general/Autobahn'

const styles = {
    dialog: {
        width: 600,
    }
}

class AutoAdd extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            values: {}
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
        const {classes, title, text, columns, open, onClose} = this.props
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
                            <TextField
                                key={column.id}
                                type={column.numeric ? 'number' : 'text'}
                                label={column.label}
                                margin='dense'
                                fullWidth
                                autoFocus={first}
                                value={this.state[column.id]}
                                onChange={(e) => this.handleInputChange(e, column.id)}
                            />
                        )

                        first = false
                        return ret
                    })}
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={onClose}>
                        Abbrechen
                    </Button>
                    <Button color='primary' onClick={this.handleAdd}>
                        Hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>)
    }
}

export default withStyles(styles)(AutoAdd)