import React from 'react'
import TableView from '../../components/TableView'

const columnData = [
    {id: 'id', type: 'number', padding: false, label: 'ID', min: true},
    {
    id: 'einsatzbereit', type: 'oneof', label: 'Einsatzbereit', inlineEdit: true,
    oneof: {1: 'Ja', 0: 'Nein'}, format: (v) => v + '',
    },
    {id: 'rufname', type: 'text', label: 'Rufname', inlineEdit: true},
    {id: 'mannstaerke', type: 'number', label: 'Mannstärke', inlineEdit: true},
    {id: 'ps', type: 'number', label: 'PS', inlineEdit: true, format: (v) => v + 'PS'},
    {id: 'bez', type: 'text', label: 'Bezeichnung', inlineEdit: true},
    {
        id: 'automatik', type: 'oneof', label: 'Automatik', inlineEdit: true,
        oneof: {1: 'Ja', 0: 'Nein'}, format: (v) =>  v + '',
    },
    {id: 'kennz', type: 'text', label: 'Kennzeichen', inlineEdit: true},
    {id: 'fmenge', type: 'text', label: 'Füllmenge', inlineEdit: true, format: (v) => v + 'L'},
];

class Rang extends React.Component {

    render() {

        return (
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'vehicle.get',
                        delete: 'vehicle.delete',
                        update: 'vehicle.update',
                        create: 'vehicle.create',
                    }}
                    autoAdd
                    showAdd
                    title='Fahrzeuge'
                />
        )
    }
}

export default Rang