import React from 'react'
import PropTypes from 'prop-types'
import TableView from './TableView'
import EnhancedDataTable from './EnhancedDataTable'

class TableViewIndex extends React.Component {

    render() {
        const {onlyShow, ...other} = this.props
        if(onlyShow === true) {
            return <EnhancedDataTable {...other} />
        } else {
            return <TableView {...other} />
        }
    }

}

TableViewIndex.propTypes = {
    onlyShow: PropTypes.bool,
}

TableViewIndex.defaultProps = {
    onlyShow: false,
}


export default TableViewIndex