import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper'
import {CircularProgress} from 'material-ui/Progress'
import Typography from 'material-ui/Typography'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    progress: {
        //width: '100%',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'center',
    }
})

class DataTable extends React.Component {

    render() {
        const {columns, classes, data: dataSet, loading} = this.props

        return (
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(n => {
                                return (
                                    <TableCell key={n.label} {...n.props}>{n.label}</TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(!loading && dataSet.length !== 0) && dataSet.map((data, index) => {
                            return (
                                <TableRow key={index}>
                                    {columns.map((n, index) => {
                                        const select = n.id ? n.id : n.label
                                        const showData = n.format ? n.format(data[select]) : data[select];
                                        return (
                                            <TableCell key={index} {...n.props} numeric={n.numeric}>{showData}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                        {(!loading && dataSet.length === 0) &&
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className={classes.progress}>
                                        <Typography variant='display1'>No data was found.</Typography>
                                    </div>
                                </td>
                            </tr>
                        }
                        {loading &&
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className={classes.progress}>
                                        <CircularProgress/>
                                    </div>
                                </td>
                            </tr>
                        }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

DataTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array.isRequired,
    loading: PropTypes.bool,
}

DataTable.defaultProps = {
    data: [],
    loading: false,
}

export default withStyles(styles)(DataTable)