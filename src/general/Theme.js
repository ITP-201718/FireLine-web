import React, { Children } from 'react'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'

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
        <MuiThemeProvider theme={theme}>
            {Children.only(props.children)}
        </MuiThemeProvider>
    )
}

export default Theme