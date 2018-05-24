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
                        get: 'decontrol.get',
                        delete: 'decontrol.delete',
                        update: 'decontrol.update',
                        create: 'decontrol.create',
                    }}
                    autoAdd
                    showAdd
                    title='Freigaben'
                />
            </Container>
        )
    }
}

export default Rang