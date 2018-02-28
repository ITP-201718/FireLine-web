import { connect } from 'react-redux'
import MainWrapper_c from './MainWrapper'
import { setDrawerOpen } from '../../actions/mainWrapper';

const mapStateToProps = top_state => {
    const state = top_state.get('mainWrapper')
    return {
        drawerOpen: state.get('open')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDrawerOpen: (open) => {dispatch(setDrawerOpen(open))}
    }
}

const MainWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainWrapper_c)

export default MainWrapper