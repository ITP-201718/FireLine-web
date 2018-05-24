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
import Select from 'material-ui/Select'
import {MenuItem} from 'material-ui/Menu'
import {format} from 'date-fns'
import DatePicker from 'material-ui-pickers/DatePicker'
import Input from 'material-ui/Input'
import Avatar from 'material-ui/Avatar'
import ClassNames from 'classnames'

import {call, isConnected, subscribe, unsubscribe, registerOnConnect, unregisterOnConnect} from '../../general/Autobahn'
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
    },
    inputFont: {
        fontSize: '0.8125rem',
    },
    iconFont: {
        fontSize: 19,
    },
    lineHeight: {
        lineHeight: '26px',
        whiteSpace: 'nowrap',
        width: 'calc(100% + 24px)',
    },
    inLine: {
        display: 'inline',
    },
    floatRight: {
        float: 'right',
        height: 'inherit',
        width: 24,
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
            search: '',
            page: 0,
            rowsPerPage: 10,
            popover: popoverDefaults,
            subscriptions: null,
            autoAddOpen: false,
        }
    }

    typeOpenPopup = ['text', 'mail', 'number', 'phone']

    componentDidMount = () => {
        if (isConnected()) {
            this.initComponent()
        } else {
            this.onConnect = registerOnConnect(this.initComponent)
        }
    }

    initComponent = async () => {
        this.getData()
        const {uris} = this.props
        let subscriptions = {
            update: await subscribe(uris.update, this.handleWampUpdate),
            create: await subscribe(uris.create, this.handleWampCreate),
            delete: await subscribe(uris.delete, this.handleWampDelete),
        }

        this.setState({subscriptions})
    }

    componentWillUnmount = async () => {
        if (this.onConnect) {
            unregisterOnConnect(this.onConnect)
        }
        if (this.state.subscriptions && isConnected()) {
            const {subscriptions} = this.state
            await unsubscribe(subscriptions.delete)
            await unsubscribe(subscriptions.create)
            await unsubscribe(subscriptions.update)
        }
    }

    onAdd = (e) => {
        if (this.props.autoAdd) {
            this.setAutoAddOpen(true)
        }
        this.props.onAdd()
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
        this.setState({data: newData})
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

        this.setState({data: newData})
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
        this.setState({data: newData})
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
            this.setState({data: this.props.data})
            return
        }

        const {uris} = this.props

        const uri = uris.get
        let res
        try {
            res = await call(uri, [], {limit: -1})
        } catch (e) {
            console.error(e)
            return
        }

        this.setState({
            data: res.data
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property
        let order = 'desc'

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc'
        }

        this.setState({order, orderBy})
    }

    sort = (order = this.state.order, orderBy = this.state.orderBy, gotData = null) => {
        let sortData = gotData ? gotData : this.state.data
        if (!Array.isArray(sortData)) {
            sortData = []
        }

        return order === 'desc'
            ? sortData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : sortData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    }

    filter = (search = '', gotData = null) => {
        let sortData = gotData ? gotData : this.state.data
        if (!Array.isArray(sortData)) {
            sortData = []
        }

        if (search === '') {
            return sortData
        }

        let retData = []
        const regex = new RegExp(search, 'i')

        for (const data of sortData) {
            let add = false
            for (const i in data) {
                if ((data[i] + '').search(regex) !== -1) {
                    add = true
                    break
                }
            }
            if (add) {
                retData.push(data)
            }
        }

        return retData
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
        this.props.onEdit(id)
    }

    handleInlineChange = (event, column, row) => {
        if (column.inlineEdit !== true) {
            return
        }

        console.log(column)

        event.stopPropagation()

        if (this.typeOpenPopup.includes(column.type)) {
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

    }

    handlePopupUpdate = () => {
        const {popover} = this.state
        this.handlePopoverClose()

        if (popover.row[popover.column.id] === popover.text) {
            return
        }

        this.handleDataUpdate(popover.column, popover.row, popover.text)
    }

    handleDataUpdate = (column, row, value) => {
        const {uris} = this.props

        call(uris.update, [], {
            id: row.id,
            values: {
                [column.id]: value,
            }
        })
    }

    handlePopoverOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.handlePopupUpdate()
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

    getCell = (row, column) => {
        const {classes} = this.props

        let data = row[column.id]
        if ('format' in column) {
            data = column.format(data, row, column)
        }
        const cType = column.type
        if (this.typeOpenPopup.includes(cType)) {
            return data
        } else if (cType === 'oneof') {
            if (column.inlineEdit) {
                return (
                    <Select
                        value={data}
                        fullWidth
                        autoWidth={true}
                        className={classes.inputFont}
                        onChange={(e) => {
                            this.handleDataUpdate(column, row, e.target.value)
                        }}
                        input={<Input disableUnderline/>}
                    >
                        {
                            Object.keys(column.oneof).map((item) => (
                                <MenuItem value={item} key={item}>{column.oneof[item]}</MenuItem>
                            ))
                        }
                    </Select>
                )
            } else {
                return column.oneof[data]
            }
        } else if (cType === 'date') {
            if (column.inlineEdit) {
                return (
                    <div className={classes.lineHeight}>
                        <div className={classes.inLine}>{format(data, 'DD/MM/YYYY')}</div>
                        {<DatePicker
                            onChange={(newDate) => {
                                this.handleDataUpdate(column, row, format(newDate, 'YYYY-MM-DD'))
                            }}
                            value={data}
                            format={'DD/MM/YYYY'}
                            keyboard
                            clearable
                            emptyLabel={'0000-00-00'}
                            disableFuture
                            TextFieldComponent={(props) => {
                                const onClick = props.InputProps.endAdornment.props.children.props.onClick
                                return (
                                    <IconButton onClick={onClick}
                                                className={ClassNames(classes.inLine, classes.floatRight)}>
                                        <Icon>
                                            event
                                        </Icon>
                                    </IconButton>)
                            }}
                            classes={{input: classes.inputFont}}
                        />}
                    </div>
                )
            } else {
                return format(data, 'DD/MM/YYYY')
            }
        } else if (cType === 'img') {
            return <Avatar src={data}/>
        }

        return null
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    handleSearchChange = (value) => {
        this.setState({search: this.escapeRegExp(value)})
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, columns, title, onlyShow, showEdit, showAdd, uris, autoAddTitle, autoAddText} = this.props
        const {data, order, orderBy, selected, rowsPerPage, page, popover, search} = this.state

        let shownData = [...data]
        if (!Array.isArray(shownData)) {
            shownData = []
        }

        shownData = this.sort(order, orderBy, data)
        shownData = this.filter(search, shownData)

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, shownData.length - page * rowsPerPage)
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
                    onSearchChange={this.handleSearchChange}
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
                            rowCount={shownData.length}/>
                        <TableBody>
                            {shownData.length < 1 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + extraColumns}>
                                            <div className={classes.center}>
                                                <Typography variant='display1'>No data was found</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) :
                                shownData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
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
                                                        numeric={column.type === 'number'}
                                                        padding={getPadding(column.padding)}
                                                        classes={{typeBody: column.min ? classes.tdMin : ''}}
                                                        onClick={(e) => this.handleInlineChange(e, column, n)}
                                                    >
                                                        {this.getCell(n, column)}
                                                    </TableCell>)
                                            })}

                                        </TableRow>
                                    )
                                })}
                            {(emptyRows > 0 && shownData.length > rowsPerPage) && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={columns.length + extraColumns}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component='div'
                    count={shownData.length}
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
                        type={popover.column ? popover.column.type : 'text'}
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
                        onClick={(e) => {
                            this.onAdd(e)
                        }}
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
                        onClose={() => {
                            this.setAutoAddOpen(false)
                        }}
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
    showAdd: PropTypes.bool,
    onAdd: PropTypes.func,
    showEdit: PropTypes.bool,
    onEdit: PropTypes.func,
    sortAtMount: PropTypes.bool,
    autoAdd: PropTypes.bool,
    autoAddTitle: PropTypes.string,
    autoAddText: PropTypes.string
};

TableView.defaultProps = {
    sortAtMount: false,
    showAdd: false,
    onAdd: () => {
    },
    showEdit: false,
    onEdit: () => {
    },
    autoAdd: false,
    autoAddTitle: 'Neues erstellen'
}

export const getPadding = (type) => {
    const paddings = ['default', 'checkbox', 'dense', 'none']
    if (typeof type === 'boolean') {
        return type ? 'default' : 'none'
    }
    if (typeof type === 'string') {
        if (paddings.includes(type)) {
            return type
        }
    }
    if (typeof type === 'number') {
        if (type >= 0 && type < paddings.length) {
            return paddings[type]
        }
    }
    return 'dense'
}

export default withStyles(styles)(TableView)