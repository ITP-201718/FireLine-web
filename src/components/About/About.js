import React from 'react'
import Grid from 'material-ui/Grid'
import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'

class About extends React.Component {

    render() {

        return (
            <Grid container spacing={24} justify='center'>
                <Grid item xs={5} md={2} lg={3}>
                    <img src="/img/logo.svg" width="100%" alt="FireLine Logo"/>
                </Grid>
                <Hidden xsDown>
                    <Grid item lg={1} />
                </Hidden>
                <Grid item xs={12} md={10} lg={8}>
                    <Hidden smDown><br /><br /><br /></Hidden>
                    <Typography variant='display1'>
                        Willkommen
                    </Typography>
                    <Typography variant='title'>
                        FireLine ist ein Online Verwaltungs-System der österreichischen Feuerwehr
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}

export default About