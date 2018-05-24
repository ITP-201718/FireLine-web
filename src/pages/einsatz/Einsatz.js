import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    {id: 'id', type: 'number', padding: false, label: 'ID', min: true},
    {id: 'ort', type: 'text', label: 'Ort', inlineEdit: true},
    {id: 'von', type: 'datetime', label: 'Startzeit', inlineEdit: true},
    {id: 'bis', type: 'datetime', label: 'Endzeit', inlineEdit: true},
    {id: 'estufe', type: 'text', label: 'Einsatzstufe', inlineEdit: true},
    {id: 'beschreibung', type: 'datetime', label: 'Beschreibung', inlineEdit: true},
];

class Rang extends React.Component {

    render() {

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'mission.get',
                        delete: 'mission.delete',
                        update: 'mission.update',
                        create: 'mission.create',
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