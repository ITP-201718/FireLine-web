import React from 'react'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'

const theme = createMuiTheme({
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
});

const Theme = (props) => (
    <MuiThemeProvider theme={theme}>
        {props.children}
    </MuiThemeProvider>
)

export default Theme