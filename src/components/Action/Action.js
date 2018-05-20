import React from 'react'
import {call} from '../../general/Autobahn'

const withAction = (options = {}) => Component => {

    class Action extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                values: options.defaultValues ? options.defaultValues : {},
                errors: {},
            }
        }

        /**
         * Updates the value
         * @param name Name of the value to be updated
         * @param newValue New Value
         */
        updateValue = (name, newValue) => {
            const {values, errors} = this.state
            let newValues = {...values}
            newValues[name] = newValue

            if(name in errors) {
                let newErrors = {...errors}
                delete newErrors[name]
                this.setState({errors: newErrors})
            }

            this.setState({values: newValues})
        }

        getValue = (name) => {
            const {values} = this.state
            const val = values[name]
            return val !== undefined ? val : ''
        }

        executeAction = async () => {
            const {values} = this.state

            let sendValues = {}

            if(options.formaters) {
                for (let i in values) {
                    let val = values[i]
                    if (i in options.formaters) {
                        val = options.formaters[i](val)
                    }
                    sendValues[i] = val
                }
            } else {
                sendValues = values
            }

            let sendObj = {values: sendValues}

            if(options.idOutsideValues === true) {
                sendObj.id = values.id
                delete values.id
            }

            try {
                await call(options.uri, [], sendObj)
            } catch(e) {
                if(e.error === 'io.fireline.error.validate') {
                    //console.log(e.args[0])
                    this.setState({errors: e.args[0]})
                } else {
                    console.error(e)
                }
            }
        }

        render() {
            const {children, defaultValues, uri, ...other} = this.props
            const {errors} = this.state

            let extraProps = {}
            if(options.actionProp === true) {
                extraProps = {
                    actionProp: {
                        getValue: this.getValue,
                        updateValue: this.updateValue,
                        executeAction: this.executeAction,
                        errors: errors,
                    }
                }
            } else {
                extraProps = {
                    getValue: this.getValue,
                    updateValue: this.updateValue,
                    executeAction: this.executeAction,
                    errors: errors,
                }
            }

            return <Component {...extraProps} {...other} />
        }
    }

    return Action
}

export default withAction