import { connect } from 'react-redux'
import LoggedIn from './LoggedIn'

const mapStateToProps = (state) => {
    return {
        loggedIn: state.getIn(['profile', 'loggedIn'])
    }
}

export default connect(mapStateToProps)(LoggedIn)