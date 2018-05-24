import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    {id: 'id', type: 'number', padding: false, label: 'ID', min: true},
    {id: 'name', type: 'text', label: 'Name', inlineEdit: true},
];

class Rang extends React.Component {

    render() {

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'devicegroup.get',
                        delete: 'devicegroup.delete',
                        update: 'devicegroup.update',
                        create: 'devicegroup.create',
                    }}
                    autoAdd
                    showAdd
                    title='Gerätegruppen'
                />
            </Container>
        )
    }
}

export default Rang