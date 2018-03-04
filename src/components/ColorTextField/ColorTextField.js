import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withTheme } from 'material-ui/styles'

class ColorTextField extends React.Component {

    render() {
        let { theme, inputTheme, inputShade, labelTheme, labelShade, inkbarTheme, inkbarShade, ...leftOver} = this.props

        labelTheme = labelTheme ? labelTheme : inputTheme
        labelShade = labelShade ? labelShade : inputShade
        inkbarTheme = inkbarTheme ? inkbarTheme : inputTheme
        inkbarShade = inkbarShade ? inkbarShade : inputShade

        return (
            <TextField {...leftOver}>
                {this.props.children}
            </TextField>
        )
    }

}

ColorTextField.defaultProps = {
    inputTheme: 'primary',
    inputShade: 'main'
}

ColorTextField.propTypes = {
    theme: PropTypes.object.isRequired,
    inputTheme: PropTypes.string.isRequired,
    inputShade: PropTypes.string.isRequired,
    labelTheme: PropTypes.string,
    labelShade: PropTypes.string,
    inkbarTheme: PropTypes.string,
    inkbarShade: PropTypes.string,
}

export default withTheme()(ColorTextField)