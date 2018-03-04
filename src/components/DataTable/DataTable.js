import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
})

class DataTable extends React.Component {

    render() {
        const {names, classes} = this.props
        const dataSet = this.props.data

        return (
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {names.map(n => {
                                    return (
                                        <TableCell key={n.name} {...n.props}>{n.name}</TableCell>
                                    )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSet.map((data, index) => {
                            return (
                                <TableRow key={index}>
                                    {names.map((n, index) => {
                                        const select = n.selector ? n.selector : n.name
                                        data[select] = n.format ? n.format(data[select]) : data[select];
                                        return (
                                            <TableCell key={index} {...n.props}>{data[select]}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    names: PropTypes.array.isRequired,
}

export default withStyles(styles)(DataTable)