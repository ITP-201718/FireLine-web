import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID', min: true},
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'kname', numeric: false, disablePadding: false, label: 'Kurzform'}
];

const data = [{"kname":"OFM","id":1,"name":"Oberfeuerwehrmann"}]

class Rang extends React.Component {

    render() {
        const {classes} = this.props

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'rank.get',
                        delete: 'rank.remove'
                    }}
                    title='Ränge'
                    showEdit
                    data={data}
                />
            </Container>
        )
    }
}

export default Rang