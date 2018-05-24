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
                        get: 'jurisdiction.get',
                        delete: 'jurisdiction.delete',
                        update: 'jurisdiction.update',
                        create: 'jurisdiction.create',
                    }}
                    autoAdd
                    showAdd
                    title='Zuständigkeitsbereiche'
                />
            </Container>
        )
    }
}

export default Rang