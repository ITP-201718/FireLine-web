import Mitglied from './Mitglied'
import _EditMitglied from './EditMitglied'
import _AddMitglied from './AddMitglied'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'


/*
Add Mitglied
 */
export const AddMitglied = _AddMitglied

/*
Edit Mitglied
 */
export const EditMitglied = _EditMitglied

/*
Mitglied
 */
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: () => {dispatch(push('/mitglied/add'))},
        onEdit: (id) => {dispatch(push('/mitglied/edit/' + id))},
    }
}

const exp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Mitglied)

export default exp