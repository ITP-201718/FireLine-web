import React from 'react';
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types';
import Table, {
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography'
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar'
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon'
import {call} from '../../general/Autobahn'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    select: {
        fontSize: 12,
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing.unit * 6 + 'px 0',
    },
    tdMin: {
        width: 1,
    },
});

class TableView extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            order: 'asc',
            orderBy: '',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 10,
        }
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = async () => {
        // TODO: remove this debugging statement
        if(this.props.data) {
            this.setState({data: this.props.data})
            return
        }

        const uri = this.props.uris.get
        let res
        try {
            res = await call(uri, [], {limit: -1})
        } catch (e) {
            console.error(e)
            return
        }
        this.setState({data: res.data})
        this.sort(this.props.order, this.props.orderBy)
    }

    handleRequestSort = (event, property) => {
        const orderBy = property
        let order = 'desc'

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc'
        }

        this.sort(order, orderBy)
        this.setState({order, orderBy})
    }

    sort = (order, orderBy) => {

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

        this.setState({data})
    }

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({selected: this.state.data.map(n => n.id)})
            return
        }
        this.setState({selected: []})
    }

    handleClick = (event, id) => {
        const {selected} = this.state
        const selectedIndex = selected.indexOf(id)
        let newSelected = [...selected]

        if (selectedIndex === -1) {
            newSelected.push(id)
        } else {
            newSelected.splice(selectedIndex, 1)
        }

        this.setState({selected: newSelected})
    }

    delete = (id) => {
        const {data, selected} = this.state
        let dataIndex = -1
        for (let i in data) {
            if (data[i].id === id) {
                dataIndex = i;
            }
        }

        if (this.isSelected(id)) {
            this.handleClick(null, id)
        }

        let newData = [...data]
        newData.splice(dataIndex, 1)
        this.setState({data: newData})
    }

    handleDelete = () => {
        const {uris} = this.props
        const {selected, data} = this.state
        for (let id of selected) {
            call(uris.delete, null, {id})
                .then(() => {
                    this.delete(id)
                })
        }
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    }

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    }

    handleEdit = (event, id) => {
        event.stopPropagation()
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, columns, title, onlyShow, showEdit} = this.props
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
        let extraColumns = 1
        showEdit && extraColumns++
        onlyShow && (extraColumns = 0)

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    title={title}
                    onDelete={this.handleDelete}
                    onRefresh={this.getData}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            columns={columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            showEdit={showEdit}
                            onlyShow={onlyShow}
                            onRequestSort={this.handleRequestSort}
                            onSelectAllClick={this.handleSelectAllClick}
                            rowCount={data.length}/>
                        <TableBody>
                            {data.length < 1 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + extraColumns}>
                                            <div className={classes.center}>
                                                <Typography variant='display1'>No data was found</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) :
                                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id)
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role='checkbox'
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding='checkbox' classes={{typeBody: classes.tdMin}}>
                                                <Checkbox checked={isSelected}/>
                                            </TableCell>

                                            {showEdit &&
                                            <TableCell padding='none' classes={{typeBody: classes.tdMin}}>
                                                <IconButton arial-label='Edit' onClick={(e) => this.handleEdit(e, n.id)}>
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                            </TableCell>}

                                            {columns.map(column => {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        numeric={column.numeric}
                                                        padding={column.disablePadding ? 'none' : 'default'}
                                                        classes={{typeBody: column.min ? classes.tdMin : ''}}
                                                    >
                                                        {n[column.id]}
                                                    </TableCell>)
                                            })}

                                        </TableRow>
                                    )
                                })}
                            {(emptyRows > 0 && data.length > rowsPerPage) && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={columns.length + extraColumns}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component='div'
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    classes={{
                        select: classes.select
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        )
    }
}

TableView.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    uris: PropTypes.object.isRequired,
    title: PropTypes.string,
    showOnly: PropTypes.bool,
    showAdd: PropTypes.bool,
    onAdd: PropTypes.func,
    showEdit: PropTypes.bool,
};

TableView.defaultProps = {
    showOnly: false,
    showAdd: false,
    onAdd: () => {
    },
    showEdit: false,
}

export default withStyles(styles)(TableView)