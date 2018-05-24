import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    {id: 'id', type: 'number', padding: false, label: 'ID', min: true},
    {id: 'name', type: 'text', label: 'Name', inlineEdit: true},
    {id: 'uri', type: 'text', label: 'URI', inlineEdit: true},
];

class Rang extends React.Component {

    render() {

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'permission.get',
                        delete: 'permission.delete',
                        update: 'permission.update',
                        create: 'permission.create',
                    }}
                    autoAdd
                    showAdd
                    title='Berechtigungen'
                />
            </Container>
        )
    }
}

export default Rang