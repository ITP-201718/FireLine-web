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
import IconButton from 'material-ui/IconButton'
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

        this.state = {
            selected: this.getSelctedFromProp(),
            options: {},
            loading: true,
            search: '',
            dialogOpen: false,
        }
    }

    getSelctedFromProp = () => {
        let selected = this.props.value ? this.props.value : []
        if(!Array.isArray(selected)) {
            selected = [selected]
        }
        if(!this.props.multi && selected.length > 1) {
            selected = selected.splice(1)
        }
        return selected
    }

    reset = () => {
        this.setState({
            selected: this.getSelctedFromProp(),
            options: {},
            loading: true,
            search: '',
            dialogOpen: false,
        })
    }

    componentWillMount() {
        this.getData()
    }

    componentDidUpdate(prevProps) {
        const {uri: prevUri} = prevProps
        const {uri} = this.props
        if (prevUri !== uri) {
            this.reset()
            this.getData()
        }
    }

    getData = async () => {
        const {uri, nameId, format} = this.props

        if (isConnected()) {
            const res = await call(uri, [], {limit: -1})
            let newOptions = {}
            if (typeof format === 'function') {
                for (const row of res.data) {
                    newOptions[row.id] = format(row[nameId], row)
                }
            } else {
                for (const row of res.data) {
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

        if (search === '') {
            return options
        }
        const regex = new RegExp(search, 'i')

        let retOptions = []
        for (const i in options) {
            const option = options[i]
            if (option.search(regex) !== -1) {
                retOptions[i] = option
            }
        }

        return retOptions
    }

    componentWillUnmount() {
        if (this.onConnect) {
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

        if (checked) {
            newSelected.push(option)
        } else {
            newSelected.splice(newSelected.indexOf(option), 1)
        }
        this.setState({selected: newSelected})
    }

    handleOk = () => {
        const {multi, onChange} = this.props
        const {selected} = this.state
        if (multi) {
            onChange(selected)
        } else {
            if (selected.length === 1) {
                onChange(selected[0])
            }
        }
        this.setState({dialogOpen: false})
    }

    handleCancel = () => {
        this.setState({dialogOpen: false})
    }

    render() {
        const {multi, classes, icon, onlyIcon, value, TextFieldProps} = this.props
        const {selected, loading, options: allOptions, dialogOpen} = this.state

        let textFieldValue = value
        if(!Array.isArray(textFieldValue)) {
            textFieldValue = [textFieldValue]
        }
        let textFieldString = ''
        for(const entry of textFieldValue) {
            textFieldString += allOptions[entry] + ', '
        }
        textFieldString = textFieldString.slice(0, -2)
        if(dialogOpen) {
            textFieldString += ' '
        }

        const options = this.getFilteredData()

        return (
            <div>
                {onlyIcon ?
                    <IconButton>{icon}</IconButton> :
                    <TextField
                        value={textFieldString}
                        {...TextFieldProps}
                        onClick={() => {this.setState({dialogOpen: true})}}
                        onKeyUp={(event) => {event.key === 'Enter' && this.setState({dialogOpen: true})}}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'><Icon>arrow_drop_down</Icon></InputAdornment>
                        }}
                    />
                }
                <Dialog
                    open={dialogOpen}
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
                        {!loading && (<RadioGroup
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
                                            onChange={(e, c) => {
                                                this.handleCheckboxChange(e, option, c)
                                            }}
                                        /> :
                                        <Radio checked={isSelected}/>}
                                    label={options[option]}/>
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
            </div>
        )
    }

}

EnhancedSelect.propTypes = {
    uri: PropTypes.string.isRequired,
    nameId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.oneOf([null])]),
    multi: PropTypes.bool,
    format: PropTypes.func,
    onlyIcon: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    TextFieldProps: PropTypes.object,
}

EnhancedSelect.defaultProps = {
    multi: false,
    onlyIcon: false,
    icon: <Icon>arrow_key_down</Icon>,
    onChange: () => {
    },
}

export default withStyles(styles)(EnhancedSelect)