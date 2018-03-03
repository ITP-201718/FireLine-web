import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import LoggedIn from '../LoggedIn'
import DataTable from '../DataTable'
import Typography from 'material-ui/Typography'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    display1: {
        //marginBottom: 5,
    }
});

class Main extends React.Component {

    render() {
        const {classes} = this.props;

        const missions = {
            names: [
                {name: 'Datum', selector: 'date'},
                {name: 'Zeit', selector: 'time'},
                {name: 'Einsatzort', selector: 'location'},
                {name: 'Einsatzstuffe', selector: 'level'},
            ],
            data: [
                {date: '02.03.2018', time: '14:56', location: 'Reichergasse 217', level: 'B1'},
                {date: '14.02.2018', time: '23:44', location: 'Kirchenplatz', level: 'B2'},
                {date: '12.02.2018', time: '04:06', location: 'Hauptstraße 44', level: 'B3'},
            ],
        }

        const work = {
            names: [
                {name: 'Datum', selector: 'date'},
                {name: 'Uhrzeit von', selector: 'timeFrom'},
                {name: 'Uhrzeit bis', selector: 'timeTo'},
                {name: 'Person', selector: 'person'},
                {name: 'Arbeit', selector: 'work'},
            ],
            data: [
                {date: '28.02.2018', timeFrom: '15:00', timeTo: '16:30', person: 'Florian Bulis', work: 'Aufräumen im Haus'},
                {date: '26.02.2018', timeFrom: '17:30', timeTo: '19:30', person: 'Andre Stöber', work: 'Schulung'},
                {date: '25.02.2018', timeFrom: '11:00', timeTo: '11:30', person: 'Gerald Mathuber', work: 'Verwaltung'},
            ],
        }

        const drives = {
            names: [
                {name: 'Datum', selector: 'date'},
                {name: 'Kilometerstand', selector: 'distance'},
                {name: 'Fahrer', selector: 'driver'},
                {name: 'Fahrzeug', selector: 'vehicle'},
            ],
            data: [
                {date: '27.02.2018', distance: 2578, driver: 'Andre Stöber', vehicle: 'HLF3'},
                {date: '27.02.2018', distance: 186995, driver: 'Thomas Blaha', vehicle: 'MTF-1'},
                {date: '26.02.2018', distance: 268123, driver: 'Chrisoph Kaiser', vehicle: 'RÜST'},
            ],
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={12} sm={10} md={8} lg={6}>
                        <LoggedIn not>
                            <h1>Hello Users</h1>
                            <h2>This is the main page</h2>
                        </LoggedIn>
                        <LoggedIn>
                            <Typography variant='display1' className={classes.display1}>Letzte Einsätze</Typography>
                            <DataTable data={missions.data} names={missions.names}/>
                            <Typography variant='display1' className={classes.display1}>Letzte Arbeiten</Typography>
                            <DataTable data={work.data} names={work.names}/>
                            <Typography variant='display1' className={classes.display1}>Letzte Fahrten</Typography>
                            <DataTable data={drives.data} names={drives.names}/>
                        </LoggedIn>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(Main)