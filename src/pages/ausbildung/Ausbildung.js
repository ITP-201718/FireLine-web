import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    {id: 'id', disablePadding: true, label: 'ID', min: true, type: 'number'},
    {id: 'name', disablePadding: false, label: 'Name', inlineEdit: true, type: 'text'},
];

class Ausbildung extends React.Component {

    render() {

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'education.get',
                        delete: 'education.delete',
                        update: 'education.update',
                        create: 'education.create',
                    }}
                    title='Ausbildungen'
                    sortAtMount
                    autoAdd
                    showAdd
                    onAdd={() => {
                        console.log('add')
                    }}
                />
            </Container>
        )
    }
}

export default Ausbildung