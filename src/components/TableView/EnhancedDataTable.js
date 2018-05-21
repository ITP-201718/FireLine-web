import React from 'react'
import PropTypes from 'prop-types'
import DataTable from './DataTable'
import {isConnected, call, registerOnConnect, unregisterOnConnect} from '../../general/Autobahn';

class EnhancedDataTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentWillMount = () => {
        this.getData()
    }

    getData = async () => {
        if(!isConnected()) {
            this.onConnect = registerOnConnect(this.getData)
            return
        }
        const {uri, number, orderBy, order} = this.props
        const res = await call(uri, [], {limit: number, order_by: orderBy, order})
        this.setState({data: res.data, loading: false})
    }

    componentWillUnmount = () => {
        if(this.onConnect) {
            unregisterOnConnect(this.onConnect)
        }
    }

    render() {
        const {columns} = this.props
        const {data, loading} = this.state

        return <DataTable columns={columns} loading={loading} data={data}/>
    }

}

EnhancedDataTable.propTypes = {
    uri: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    number: PropTypes.number,
    orderBy: PropTypes.string,
    order: PropTypes.string,
}

EnhancedDataTable.defaultProps = {
    number: 3,
    orderBy: null,
    order: null,
}

export default EnhancedDataTable