import React from 'react'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'

/*const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff624b',
            main: '#E52620',
            dark: '#aa0000',
        },
        secondary: {
            ligth: '#ffffff',
            main: '#efefef',
            dark: '#bdbdbd',
        }
    }
});*/

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff6f42',
            main: '#dc3b14',
            dark: '#a20000',
        },
        secondary: {
            ligth: '#6e6e91',
            main: '#424363',
            dark: '#191c39',
        }
    }
})

const Theme = (props) => (
    <MuiThemeProvider theme={theme}>
        {props.children}
    </MuiThemeProvider>
)

export default Theme