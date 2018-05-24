import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText} from 'material-ui/List'
import {FormControlLabel} from 'material-ui/Form'
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog'
import Radio, {RadioGroup} from 'material-ui/Radio'
import Checkbox from 'material-ui/Checkbox'

const styles = theme => {
    return {
        dialog: {
            width: '100%',
            maxHeight: 435,
        },
    }
}

class EnhancedSelect extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: ['a', 'b'],
            options: {
                a: 'A',
                b: 'B',
                c: 'C',
                d: 'D',
                e: 'E',
                f: 'F',
                g: 'G',
                a2: 'A',
                b2: 'B',
                c2: 'C',
                d2: 'D',
                e2: 'E',
                f2: 'F',
                g2: 'G',
            }
        }
    }

    handleRadioChange = (event, value) => {
        this.setState({selected: [value]})
    }

    handleCheckboxChange = (option, checked) => {
        const {selected} = this.state
        let newSelected = [...selected]

        if(checked) {
            newSelected.push(option)
        } else {
            newSelected.splice(newSelected.indexOf(option), 1)
        }
        this.setState({selected: newSelected})
    }

    render() {
        const {multi, classes, open} = this.props
        const {options, selected} = this.state

        return (
            <Dialog
                open={open}
                classes={{
                    paper: classes.dialog,
                }}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle>Choose {multi ? 'many' : 'one'}</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        onChange={this.handleRadioChange}
                    >
                        {Object.keys(options).map((option) => {
                            const isSelected = selected.includes(option)
                            return <FormControlLabel
                                value={option}
                                key={option}
                                control={multi ?
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={(e, c) => {this.handleCheckboxChange(option, c)}}
                                    /> :
                                    <Radio checked={isSelected}/>}
                                label={options[option]} />
                        })}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button color='secondary'>
                        Cancel
                    </Button>
                    <Button color='primary'>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

EnhancedSelect.propTypes = {
    uri: PropTypes.string.isRequired,
    open: PropTypes.bool,
    mutliUse: PropTypes.bool,
    multi: PropTypes.bool,
}

EnhancedSelect.defaultProps = {
    open: false,
    mutliUse: false,
    multi: false,
}

export default withStyles(styles)(EnhancedSelect)