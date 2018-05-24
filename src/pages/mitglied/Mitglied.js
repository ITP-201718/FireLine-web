import React from 'react'
import PropTypes from 'prop-types'
import TableView from '../../components/TableView'
import md5 from 'md5'

const gA = 'https://www.gravatar.com/avatar/'
const gE = '?d=identicon&s=128'

const columnData = [
    {id: 'id', padding: false, label: 'ID', min: true, type: 'number'},
    {
        id: 'img', padding: 'dense', label: 'Foto', min: true, type: 'img', format: (d, row) => {
            return typeof row.mail === 'string' ? gA + md5(row.mail) + gE : '/img/default_user.png'
        }
    },
    {id: 'username', padding: 'dense', label: 'Benutzername', inlineEdit: false, type: 'text'},
    {id: 'first_name', label: 'Vorname', inlineEdit: true, type: 'text'},
    {id: 'last_name', label: 'Nachname', inlineEdit: true, type: 'text'},
    {id: 'mail', label: 'Email', inlineEdit: true, type: 'mail'},
    {id: 'sbuergerschaft', label: 'Staatsbs', inlineEdit: true, type: 'text'},
    {id: 'birthday', label: 'Geburtstag', inlineEdit: true, type: 'date'},
    {
        id: 'gender', label: 'Geschlecht', inlineEdit: true, type: 'oneof',
        oneof: {o: 'Anderes', m: 'Männlich', w: 'Weiblich'}
    },
]

class Mitglied extends React.Component {

    render() {
        const {onAdd, onEdit} = this.props

        return (
            <TableView
                columns={columnData}
                uris={{
                    get: 'member.get',
                    delete: 'member.delete',
                    update: 'member.update',
                    create: 'member.create',
                }}
                showEdit
                onEdit={onEdit}
                title='Mitglieder'
                showAdd
                onAdd={onAdd}
                sortAtMount
            />
        )
    }
}

Mitglied.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
}

export default Mitglied