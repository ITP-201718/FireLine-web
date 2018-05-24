import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import {FormControlLabel} from 'material-ui/Form'
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog'
import Radio, {RadioGroup} from 'material-ui/Radio'
import Checkbox from 'material-ui/Checkbox'
import {LinearProgress} from 'material-ui/Progress'
import TextField from 'material-ui/TextField'
import {InputAdornment} from 'material-ui/Input'
import Icon from 'material-ui/Icon'
import Divider from 'material-ui/Divider'
import {call, registerOnConnect, unregisterOnConnect, isConnected} from '../../general/Autobahn'

const styles = theme => {
    return {
        dialog: {
            width: '100%',
            [theme.breakpoints.up('md')]: {
                height: '70vh',
            },
            height: '90vh',
        },
        dialogContent: {
            minHeight: 150,
        },
        search: {
            [theme.breakpoints.up('md')]: {
                maxWidth: 214,
            },
            width: '100%',
            float: 'right',
        }
    }
}

class EnhancedSelect extends React.Component {

    constructor(props) {
        super(props)
        let selected = props.selected ? props.selected : []
        if(props.multi) {
            if(!Array.isArray(selected)) {
                selected = [selected]
            }
        } else {
            if(Array.isArray(selected)) {
                selected = selected[0]
            }
        }
        this.state = {
            selected: selected,
            options: {},
            loading: true,
            search: '',
        }
    }

    componentWillMount() {
        this.getData()
    }

    getData = async () => {
        const {uri, nameId, format} = this.props

        if(isConnected()) {
            const res = await call(uri, [], {limit: -1})
            console.log(res.data)
            let newOptions = {}
            if(typeof format === 'function') {
                for(const row of res.data) {
                    newOptions[row.id] = format(row[nameId], row)
                }
            } else {
                for(const row of res.data) {
                    newOptions[row.id] = row[nameId]
                }
            }

            this.setState({options: newOptions, loading: false})
        } else {
            this.onConnect = registerOnConnect(this.getData)
        }
    }

    handleSearchChange = (newSearch) => {
        this.setState({search: newSearch})
    }

    getFilteredData = () => {
        const {search, options} = this.state

        if(search === '') {
            return options
        }
        const regex = new RegExp(search, 'i')

        let retOptions = []
        for(const i in options) {
            const option = options[i]
            if(option.search(regex) !== -1) {
                retOptions[i] = option
            }
        }

        return retOptions
    }

    componentWillUnmount() {
        if(this.onConnect) {
            unregisterOnConnect(this.onConnect)
        }
    }

    handleRadioChange = (event, value) => {
        event.stopPropagation()
        this.setState({selected: [value]})
    }

    handleCheckboxChange = (event, option, checked) => {
        event.stopPropagation()
        const {selected} = this.state
        let newSelected = [...selected]

        if(checked) {
            newSelected.push(option)
        } else {
            newSelected.splice(newSelected.indexOf(option), 1)
        }
        this.setState({selected: newSelected})
    }

    handleOk = () => {
        const {multi, onChange, onClose} = this.props
        const {selected} = this.state
        if(multi) {
            onChange(selected)
        } else {
            if(selected.length === 1) {
                onChange(selected[0])
            }
        }
        onClose()
    }

    handleCancel = () => {
        const {onClose} = this.props
        onClose()
    }

    render() {
        const {multi, classes, open, theme} = this.props
        console.log('theme', theme)
        const {selected, loading} = this.state

        const options = this.getFilteredData()

        return (
            <Dialog
                open={open}
                classes={{
                    paper: classes.dialog,
                }}
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle>Choose {multi ? 'many' : 'one'}
                    <TextField
                        className={classes.search}
                        onChange={(e) => this.handleSearchChange(e.target.value)}
                        autoFocus
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Icon>search</Icon>
                                </InputAdornment>)
                        }}
                    />
                </DialogTitle>
                <Divider/>
                {loading && <LinearProgress/>}
                <DialogContent className={classes.dialogContent}>
                    {!loading &&(<RadioGroup
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
                                        onChange={(e, c) => {this.handleCheckboxChange(e, option, c)}}
                                    /> :
                                    <Radio checked={isSelected}/>}
                                label={options[option]} />
                        })}
                    </RadioGroup>)}
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button color='secondary' onClick={this.handleCancel}>
                        Cancel
                    </Button>
                    <Button color='primary' onClick={this.handleOk}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}

EnhancedSelect.propTypes = {
    uri: PropTypes.string.isRequired,
    nameId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    open: PropTypes.bool,
    mutliUse: PropTypes.bool,
    multi: PropTypes.bool,
    format: PropTypes.func,
}

EnhancedSelect.defaultProps = {
    open: false,
    mutliUse: false,
    multi: false,
    onChange: () => {},
    onClose: () => {},
}

export default withStyles(styles, {withTheme: true})(EnhancedSelect)