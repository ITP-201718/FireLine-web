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
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon'
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField'
import {call, isConnected, subscribe, unsubscribe} from '../../general/Autobahn'
import AutoAdd from './AutoAdd';

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
    popoverPaper: {
        marginLeft: 24,
        marginTop: 2,
    },
    popoverTextField: {
        margin: theme.spacing.unit * 2,
    },
    '@keyframes tableViewUpdateAnimation': {
        '0%': {backgroundColor: theme.palette.primary.main},
        '100%': {backgroundColor: 'white'}
    },
    updateAnimation: {
        animationName: 'tableViewUpdateAnimation',
        animationDuration: '325ms'
    },
    fab: {
        position: 'absolute',
        right: theme.spacing.unit * 4,
        bottom: theme.spacing.unit * 2,
    }
});

const popoverDefaults = {
    anchorEl: null,
    label: '',
    text: '',
    column: null,
    row: null,
}

class TableView extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            order: 'asc',
            orderBy: props.sortAtMount ? 'id' : '',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 10,
            popover: popoverDefaults,
            subscriptions: null,
            autoAddOpen: false,
        }
    }

    componentDidMount = async () => {
        this.getData()
        if (isConnected()) {
            const {uris} = this.props
            let subscriptions = {
                update: await subscribe(uris.update, this.handleWampUpdate),
                create: await subscribe(uris.create, this.handleWampCreate),
                delete: await subscribe(uris.delete, this.handleWampDelete),
            }

            this.setState({subscriptions})
        }
    }

    componentWillUnmount = async () => {
        if (this.state.subscriptions && isConnected()) {
            const {subscriptions} = this.state
            await unsubscribe(subscriptions.delete)
            await unsubscribe(subscriptions.create)
            await unsubscribe(subscriptions.update)
        }
    }

    setAutoAddOpen = (state) => {
        this.setState({autoAddOpen: state})
    }

    handleWampUpdate = (args, kwargs) => {
        const {data} = this.state
        const newRow = kwargs.data

        let newData = [...data]
        for (let i in newData) {
            if (newData[i].id === newRow.id) {
                newData[i] = newRow
                newData[i].update = true
                break
            }
        }
        this.setState({data: this.sort(undefined, undefined, newData)})
        setTimeout(() => {
            this.removeUpdateAnimation(newRow.id)
        }, 400)
    }

    handleWampCreate = (args, kwargs) => {
        const {data} = this.state
        const newRow = kwargs.data
        newRow.update = true
        let newData = [...data]
        newData.push(newRow)

        this.setState({data: this.sort(undefined, undefined, newData)})
        setTimeout(() => {
            this.removeUpdateAnimation(newRow.id)
        }, 400)
    }

    handleWampDelete = (args, kwargs) => {
        const newRow = kwargs.data
        this.delete(newRow.id)
    }

    removeUpdateAnimation = (rowId) => {
        const {data} = this.state
        let newData = [...data]
        for (let i in newData) {
            if (newData[i].id === rowId) {
                newData[i].update = false
            }
        }
        this.setState({data: this.sort(undefined, undefined, newData)})
    }

    getColumnById = (id) => {
        for (let column of this.props.columns) {
            if (column.id === id) {
                return column
            }
        }
    }

    getData = async () => {

        // TODO: remove this debugging statement
        if (!isConnected() && this.props.data) {
            this.setState({data: this.sort(undefined, undefined, this.props.data)})
            return
        }

        const {uris} = this.props
        const {order, orderBy} = this.state

        const uri = uris.get
        let res
        try {
            res = await call(uri, [], {limit: -1})
        } catch (e) {
            console.error(e)
            return
        }

        this.setState({
            data: this.sort(order, orderBy, res.data)
        })
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

    sort = (order = this.state.order, orderBy = this.state.orderBy, gotData = null) => {
        const sortData = gotData ? gotData : this.state.data

        const data =
            order === 'desc'
                ? sortData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : sortData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

        if (gotData) {
            return data
        }
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
        const {data} = this.state
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
        const {selected} = this.state
        for (let id of selected) {
            call(uris.delete, null, {id})
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

    handleInlineChange = (event, column, row) => {
        if (column.inlineEdit !== true) {
            return
        }

        console.log(row)

        event.stopPropagation()

        this.setState({
            popover: {
                anchorEl: event.target,
                label: column.label,
                text: row[column.id],
                column,
                row,
            }
        })
    }

    handleDataUpdate = () => {
        const {uris} = this.props
        const {popover} = this.state

        this.handlePopoverClose()

        if (popover.row[popover.column.id] === popover.text) {
            return
        }

        call(uris.update, null, {
            id: popover.row.id,
            values: {
                [popover.column.id]: popover.text
            }
        })
    }

    handlePopoverOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.handleDataUpdate()
        }
    }

    handlePopoverChange = (event) => {
        let popover = {...this.state.popover}
        popover.text = event.target.value
        this.setState({popover})
    }

    handlePopoverClose = () => {
        this.setState({popover: popoverDefaults})
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, columns, title, onlyShow, showEdit, showAdd, onAdd, uris, autoAddTitle, autoAddText} = this.props
        const {data, order, orderBy, selected, rowsPerPage, page, popover} = this.state
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
                                            className={n.update ? classes.updateAnimation : ''}
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
                                                <IconButton arial-label='Edit'
                                                            onClick={(e) => this.handleEdit(e, n.id)}>
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
                                                        onClick={(e) => this.handleInlineChange(e, column, n)}
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
                <Popover
                    open={Boolean(popover.anchorEl)}
                    anchorEl={popover.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    classes={{paper: classes.popoverPaper}}
                    onClose={this.handlePopoverClose}
                >
                    {<TextField
                        autoFocus
                        className={classes.popoverTextField}
                        label={popover.label}
                        value={popover.text}
                        onChange={this.handlePopoverChange}
                        onKeyPress={this.handlePopoverOnKeyPress}
                    />}
                </Popover>
                {showAdd && (
                    <Button
                        variant='fab'
                        color='primary'
                        aria-label='add'
                        className={classes.fab}
                        onClick={(e) => {onAdd(e); this.setAutoAddOpen(true)}}
                    >
                        <Icon>add</Icon>
                    </Button>
                )}
                {(autoAddTitle) && (
                    <AutoAdd
                        open={this.state.autoAddOpen}
                        columns={columns}
                        uris={uris}
                        title={autoAddTitle}
                        text={autoAddText}
                        onClose={() => {this.setAutoAddOpen(false)}}
                    />
                )}
                <div>
                    {this.props.children}
                </div>
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
    sortAtMount: PropTypes.bool,
    autoAddTitle: PropTypes.string,
    autoAddText: PropTypes.string
};

TableView.defaultProps = {
    sortAtMount: false,
    showOnly: false,
    showAdd: false,
    onAdd: () => {
    },
    showEdit: false,
    autoAddTitle: 'Neues erstellen'
}

export default withStyles(styles)(TableView)