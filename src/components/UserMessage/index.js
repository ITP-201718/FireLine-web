import { connect } from 'react-redux'
import UserMessage from './UserMessage'
import {
    setUserMessageOpen,
} from '../../redux/actions/userMessage';
import {
    getUserMessageOpen,
    getUserMessageMessage,
    getUserMessageCloseDuration,
} from '../../redux/selectors/selectors';

const mapStateToProps = state => ({
    open: getUserMessageOpen(state),
    message: getUserMessageMessage(state),
    closeDuration: getUserMessageCloseDuration(state),
})

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(setUserMessageOpen(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserMessage)