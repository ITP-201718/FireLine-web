import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    {id: 'id', type: 'number', padding: false, label: 'ID', min: true},
    {id: 'work', type: 'text', label: 'Tätigkeit', inlineEdit: true},
    {id: 'von', type: 'datetime', label: 'Startzeit', inlineEdit: true},
    {id: 'bis', type: 'datetime', label: 'Endzeit', inlineEdit: true},
];

class Rang extends React.Component {

    render() {

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'activity.get',
                        delete: 'activity.delete',
                        update: 'activity.update',
                        create: 'activity.create',
                    }}
                    autoAdd
                    showAdd
                    title='Aktivitäten'
                />
            </Container>
        )
    }
}

export default Rang