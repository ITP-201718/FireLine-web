import React from 'react'
import PropTypes from 'prop-types'
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import {getPadding} from './TableView'

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, columns, onlyShow, showEdit} = this.props

        return (
            <TableHead>
                <TableRow>
                    {(!onlyShow) && (<TableCell padding='checkbox'>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount && rowCount > 0}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>)}
                    {(showEdit && !onlyShow) && (
                        <TableCell padding='none'>
                            <IconButton disabled>
                                <Icon>edit</Icon>
                            </IconButton>
                        </TableCell>
                    )}
                    {columns.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={getPadding(column.padding)}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title='Sort'
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
        )

    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired,
    showEdit: PropTypes.bool,
    onlyShow: PropTypes.bool,
}

EnhancedTableHead.defaultProps = {
    showEdit: false,
    onlyShow: false,
}

export default EnhancedTableHead