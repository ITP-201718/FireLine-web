import React from 'react'
import PropTypes from 'prop-types'

class FormElement extends React.Component {

    render() {
        const {children, onChangeProp, onChangeFunc, valueProp, actionProp, name, showHelperText, helperTextProp,
            showError, errorProp, useOnKeyUp, onKeyUpProp, childIsTextField} = this.props

        let props = {
            [valueProp]: actionProp.getValue(name),
            [onChangeProp]: (...args) => {actionProp.updateValue(name, onChangeFunc(...args))},
        }

        showError && (props[errorProp] = (name in actionProp.errors))
        showHelperText && (props[helperTextProp] =  ((name in actionProp.errors) && actionProp.errors[name][0]))

        if(useOnKeyUp) {
            if(childIsTextField) {
                props['InputProps'] = {[onKeyUpProp]: (e) => {e.key === 'Enter' && actionProp.executeAction()}}
                props['SelectProps'] = {[onKeyUpProp]: (e) => {e.key === 'Enter' && actionProp.executeAction()}}
            } else {
                props[onKeyUpProp] = (e) => {e.key === 'Enter' && actionProp.executeAction()}
            }
        }

        const Child = Array.isArray(children) ? children[0] : children

        return React.cloneElement(Child, props)
    }

}

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    actionProp: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    onChangeProp: PropTypes.string,
    onChangeFunc: PropTypes.func,
    valueProp: PropTypes.string,
    helperTextProp: PropTypes.string,
    showHelperText: PropTypes.bool,
    errorProp: PropTypes.string,
    showError: PropTypes.bool,
    onKeyUpProp: PropTypes.string,
    useOnKeyUp: PropTypes.bool,
    childIsTextField: PropTypes.bool,
}

FormElement.defaultProps = {
    childIsTextField: true,
    onChangeProp: 'onChange',
    onChangeFunc: (e) => {return e.target.value},
    valueProp: 'value',
    showHelperText: true,
    helperTextProp: 'helperText',
    showError: true,
    errorProp: 'error',
    onKeyUpProp: 'onKeyUp',
    useOnKeyUp: true,
}

export default FormElement