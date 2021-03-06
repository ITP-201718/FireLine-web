import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    {id: 'id', type: 'number', padding: false, label: 'ID', min: true},
    {id: 'name', type: 'text', label: 'Name', inlineEdit: true},
    {id: 'kname', type: 'text', label: 'Kurzform', inlineEdit: true},
];

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
                    autoAdd
                    showAdd
                    title='Ränge'
                />
            </Container>
        )
    }
}

export default Rang