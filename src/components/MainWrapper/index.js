import { connect } from 'react-redux'
import MainWrapper_c from './MainWrapper'
import { setDrawerOpen } from '../../actions/mainWrapper';
import { push } from 'react-router-redux'

const mapStateToProps = top_state => {
    const state = top_state.get('mainWrapper')
    return {
        drawerOpen: state.get('open')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDrawerOpen: (open) => {dispatch(setDrawerOpen(open))},
        push: (to) => {dispatch(push(to))},
    }
}

const MainWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainWrapper_c)

export default MainWrapper