import { connect } from 'react-redux'
import Account_c from './Account_c'
import { setUserMail } from '../../actions/profile';

const mapStateToProps = (main_state) => {
    let state = main_state.get('profile')
    return {
        userMail: state.get('mail'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserMail: (value) => {dispatch(setUserMail(value))}
    }
}

const Account = connect(
    mapStateToProps,
    mapDispatchToProps
)(Account_c)

export default Account