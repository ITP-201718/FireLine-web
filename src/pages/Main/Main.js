import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import LoggedIn from '../../components/LoggedIn/index'
import TableView from '../../components/TableView'
import Typography from 'material-ui/Typography'
import About from '../About/index'
import LoginPopup from '../../components/LoginPopup/index'
import {format} from 'date-fns'
import EnhancedSelect from '../../components/EnhancedSelect/index'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class Main extends React.Component {

    render() {
        const {classes} = this.props;

        const columns = {
            missions: [
                {label: 'Datum', id: 'von', format: (v) => {return format(v, 'DD/MM/YYYY')}},
                {label: 'Zeit', id: 'von', format: (v) => {return format(v, 'hh:mm')}},
                {label: 'Einsatzort', id: 'ort'},
                {label: 'Einsatzstufe', id: 'stufe'},
            ],
            work: [
                {label: 'Datum', id: 'von', format: (v) => {return format(v, 'DD/MM/YYYY') }},
                {label: 'Uhrzeit von', id: 'von', format: (v) => {return format(v, 'hh:mm')}},
                {label: 'Uhrzeit bis', id: 'bis', format: (v) => {return format(v, 'hh:mm')}},
                {label: 'Arbeit', id: 'work'},
            ],
            tour: [
                {label: 'Datum', id: 'date'},
                {label: 'Kilometerstand', id: 'km_ende', numeric: true,
                    format: (val) => {return val.toLocaleString() + ' km'}},
                {label: 'Fahrer', id: 'mid'},
                {label: 'Fahrzeug', id: 'fid'},
            ],
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={12} sm={11} md={12} lg={10} xl={8}>
                        <LoggedIn not>
                            <About/>
                        </LoggedIn>
                        <LoggedIn>
                            <Typography variant='display1'>Letzte Einsätze</Typography>
                            <TableView onlyShow uri='mission.get' columns={columns.missions} orderBy='von' order='desc'/>

                            <Typography variant='display1'>Letzte Arbeiten</Typography>
                            <TableView onlyShow uri='activity.get' columns={columns.work} />

                            <Typography variant='display1'>Letzte Fahrten</Typography>
                            <TableView onlyShow uri='tour.get' columns={columns.tour} />

                        </LoggedIn>
                    </Grid>
                </Grid>
                <LoginPopup/>
                <EnhancedSelect multi={false} open={false} />
            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(Main)