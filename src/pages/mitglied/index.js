import Mitglied from './Mitglied'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: () => {dispatch(push('/mitglied/add'))}
    }
}

const exp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Mitglied)

export default exp