import React from 'react'
import TableView from '../../components/TableView'
import Container from '../../components/Container/Container';

const columnData = [
    { id: 'id', numeric: true, disablePadding: true, label: 'ID', min: true},
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
];

const data = [{'id': 34, 'name': 'Ausbildung 38'}, {'id': 55, 'name': 'Ausbildung 59'}, {
    'id': 35,
    'name': 'Ausbildung 39'
}, {'id': 1, 'name': 'Ausbildung 1'}, {'id': 36, 'name': 'Ausbildung 40'}, {
    'id': 14,
    'name': 'Ausbildung 14'
}, {'id': 37, 'name': 'Ausbildung 41'}, {'id': 16, 'name': 'Ausbildung 20'}, {
    'id': 38,
    'name': 'Ausbildung 42'
}, {'id': 18, 'name': 'Ausbildung 22'}, {'id': 39, 'name': 'Ausbildung 43'}, {
    'id': 20,
    'name': 'Ausbildung 24'
}, {'id': 40, 'name': 'Ausbildung 44'}, {'id': 22, 'name': 'Ausbildung 26'}, {
    'id': 41,
    'name': 'Ausbildung 45'
}, {'id': 24, 'name': 'Ausbildung 28'}, {'id': 42, 'name': 'Ausbildung 46'}, {
    'id': 26,
    'name': 'Ausbildung 30'
}, {'id': 43, 'name': 'Ausbildung 47'}, {'id': 28, 'name': 'Ausbildung 32'}, {
    'id': 44,
    'name': 'Ausbildung 48'
}, {'id': 30, 'name': 'Ausbildung 34'}, {'id': 45, 'name': 'Ausbildung 49'}, {
    'id': 32,
    'name': 'Ausbildung 36'
}, {'id': 46, 'name': 'Ausbildung 50'}, {'id': 12, 'name': 'Ausbildung 11'}, {
    'id': 47,
    'name': 'Ausbildung 51'
}, {'id': 17, 'name': 'Ausbildung 21'}, {'id': 48, 'name': 'Ausbildung 52'}, {
    'id': 21,
    'name': 'Ausbildung 25'
}, {'id': 49, 'name': 'Ausbildung 53'}, {'id': 25, 'name': 'Ausbildung 29'}, {
    'id': 50,
    'name': 'Ausbildung 54'
}, {'id': 29, 'name': 'Ausbildung 33'}, {'id': 33, 'name': 'Ausbildung 37'}, {
    'id': 54,
    'name': 'Ausbildung 58'
}, {'id': 53, 'name': 'Ausbildung 57'}, {'id': 52, 'name': 'Ausbildung 56'}, {
    'id': 51,
    'name': 'Ausbildung 55'
}, {'id': 15, 'name': 'Ausbildung 15'}, {'id': 31, 'name': 'Ausbildung 35'}, {
    'id': 27,
    'name': 'Ausbildung 31'
}, {'id': 23, 'name': 'Ausbildung 27'}, {'id': 19, 'name': 'Ausbildung 23'}]

class Ausbildung extends React.Component {

    render() {
        const {classes} = this.props

        return (
            <Container>
                <TableView
                    columns={columnData}
                    uris={{
                        get: 'education.get',
                        delete: 'education.remove'
                    }}
                    title='Ausbildungen'
                    showEdit={true}
                    data={data}
                />
            </Container>
        )
    }
}

export default Ausbildung