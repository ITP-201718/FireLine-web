import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    {id: 'id', numeric: true, disablePadding: true, label: 'ID', min: true},
    {id: 'name', numeric: false, disablePadding: false, label: 'Name', inlineEdit: true},
    {id: 'kname', numeric: false, disablePadding: false, label: 'Kurzform', inlineEdit: true},
];

const data = [{'kname': 'OFM', 'id': 1, 'name': 'Oberfeuerwehrmann'}]

class Rang extends React.Component {

    render() {

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'rank.get',
                        delete: 'rank.delete',
                        update: 'rank.update',
                        create: 'rank.create',
                    }}
                    title='Ränge'
                    data={data}
                />
            </Container>
        )
    }
}

export default Rang