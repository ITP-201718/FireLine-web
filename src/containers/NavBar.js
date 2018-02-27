import { connect } from 'react-redux'
import {
    toggleLogin,
    setUserName,
} from '../actions/login';
import NavBar from '../components/NavBar/NavBar'

const mapStateToProps = state => {
    state = state.get('login');
    return {
        loggedIn: state.get('loggedIn'),
        userName: state.get('name')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleLogin: () => {
            dispatch(setUserName('Benjamin'))
            dispatch(toggleLogin())
        }
    }
}

const NavBarC = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)

export default NavBarC