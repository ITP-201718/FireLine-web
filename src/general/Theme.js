import React, { Children } from 'react'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff6f42',
            main: '#dc3b14',
            dark: '#a20000',
            contrastColor: '#ffffff',
        },
        secondary: {
            ligth: '#6e6e91',
            main: '#424363',
            dark: '#191c39',
        }
    }
})

const Theme = (props) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={theme}>
                {Children.only(props.children)}
            </MuiThemeProvider>
        </MuiPickersUtilsProvider>
    )
}

export default Theme