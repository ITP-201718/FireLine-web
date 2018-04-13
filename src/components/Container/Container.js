import React from 'react'
import Grid from 'material-ui/Grid'

class Container extends React.Component {

    render = () => {
        return (
            <Grid container justify='center'>
                <Grid item xs={12} sm={11} md={12} lg={10} xl={8}>
                    {this.props.children}
                </Grid>
            </Grid>
        )
    }

}

export default Container